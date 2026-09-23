/* ОХРА — витрина, корзина и оформление заказа.
   Данные товаров лежат в catalog.js, здесь только поведение. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const PAGE = 12;
  const money = (n) => n.toLocaleString("ru-RU") + " ₽";

  const state = {
    cat: "all",
    min: null,
    max: null,
    stock: false,
    sale: false,
    q: "",
    sort: "pop",
    shown: PAGE,
    promo: false,
  };

  /* --- корзина: id → количество --- */
  const cart = new Map();
  const STORE = "ohra-cart";

  const saveCart = () => {
    try {
      localStorage.setItem(STORE, JSON.stringify([...cart]));
    } catch (e) {
      /* приватный режим — просто живём без сохранения */
    }
  };
  const loadCart = () => {
    try {
      const raw = localStorage.getItem(STORE);
      if (!raw) return;
      for (const [id, n] of JSON.parse(raw)) {
        if (PRODUCTS.some((p) => p.id === id && p.stock)) cart.set(id, n);
      }
    } catch (e) {
      /* битые данные игнорируем */
    }
  };

  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  /* ===== ВИТРИНА ===== */

  function match() {
    const q = state.q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (state.cat !== "all" && p.cat !== state.cat) return false;
      if (state.min !== null && p.price < state.min) return false;
      if (state.max !== null && p.price > state.max) return false;
      if (state.stock && !p.stock) return false;
      if (state.sale && !p.old) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });

    const order = { pop: 0, cheap: 1, rich: 2, name: 3 }[state.sort];
    if (order === 1) list.sort((a, b) => a.price - b.price);
    else if (order === 2) list.sort((a, b) => b.price - a.price);
    else if (order === 3) list.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    else list.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
    return list;
  }

  function plural(n) {
    const t = n % 100 > 10 && n % 100 < 15 ? 0 : n % 10;
    if (t === 1) return "товар";
    if (t >= 2 && t <= 4) return "товара";
    return "товаров";
  }

  function card(p) {
    const inCart = cart.has(p.id);
    const badge = !p.stock
      ? '<span class="badge out">под заказ</span>'
      : p.tag
        ? `<span class="badge${p.old ? " sale" : ""}">${p.tag}</span>`
        : "";
    return `
      <article class="prod" data-id="${p.id}">
        <button class="prod-img" data-open="${p.id}" aria-label="Открыть ${p.name}">
          ${badge}
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </button>
        <div class="prod-txt">
          <span class="prod-cat">${CATS[p.cat]}</span>
          <h3 class="prod-name">${p.name}</h3>
          <div class="prod-price">
            <b>${money(p.price)}</b>
            ${p.old ? `<s>${money(p.old)}</s>` : ""}
          </div>
          <button class="add${inCart ? " in" : ""}" data-add="${p.id}"
                  ${p.stock ? "" : "disabled"}>
            ${p.stock ? (inCart ? "В корзине" : "В корзину") : "Нет в наличии"}
          </button>
        </div>
      </article>`;
  }

  function render() {
    const list = match();
    const part = list.slice(0, state.shown);
    $("#grid").innerHTML = part.map(card).join("");
    $("#empty").hidden = list.length > 0;
    $("#found").textContent = list.length
      ? `Показано ${part.length} из ${list.length} ${plural(list.length)}`
      : "";
    $("#moreBtn").hidden = part.length >= list.length;
  }

  /* ===== КОРЗИНА ===== */

  const goods = () =>
    [...cart].reduce((s, [id, n]) => s + byId(id).price * n, 0);

  function totals() {
    const g = goods();
    const disc = state.promo ? Math.round((g * SHOP.promo_off) / 100) : 0;
    const paid = g - disc;
    const way = document.querySelector('input[name="way"]:checked');
    const free = paid >= SHOP.free_from || (way && way.value === "self");
    const delivery = g === 0 ? 0 : free ? 0 : SHOP.delivery;
    return { g, disc, delivery, total: paid + delivery };
  }

  function drawCart() {
    const body = $("#cartBody");
    if (cart.size === 0) {
      body.innerHTML = '<p class="cart-empty">Пока пусто.<br>Загляните в каталог — там 48 позиций.</p>';
      $("#cartFoot").hidden = true;
    } else {
      body.innerHTML = [...cart]
        .map(([id, n]) => {
          const p = byId(id);
          return `
          <div class="ci" data-id="${id}">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <div>
              <div class="ci-name">${p.name}</div>
              <div class="ci-price">${money(p.price)} за штуку</div>
            </div>
            <div class="ci-right">
              <div class="qty">
                <button data-step="-1" data-id="${id}" aria-label="Убрать одну">−</button>
                <span>${n}</span>
                <button data-step="1" data-id="${id}" aria-label="Добавить одну">+</button>
              </div>
              <div class="ci-sum">${money(p.price * n)}</div>
            </div>
          </div>`;
        })
        .join("");
      $("#cartFoot").hidden = false;
    }

    const t = totals();
    $("#sumGoods").textContent = money(t.g);
    $("#sumDiscRow").hidden = !t.disc;
    $("#sumDisc").textContent = "−" + money(t.disc);
    $("#sumDelivery").textContent = t.delivery ? money(t.delivery) : "бесплатно";
    $("#sumTotal").textContent = money(t.total);
    $("#coTotal").textContent = money(t.total);
    $("#payAmount").textContent = money(t.total);

    const count = [...cart.values()].reduce((s, n) => s + n, 0);
    $("#cartCount").textContent = count;
  }

  function add(id, n = 1) {
    const p = byId(id);
    if (!p || !p.stock) return;
    const next = (cart.get(id) || 0) + n;
    if (next <= 0) cart.delete(id);
    else cart.set(id, Math.min(next, 99));
    saveCart();
    drawCart();
    render();
  }

  /* ===== ОКНА ===== */

  const openBox = (el) => {
    $("#overlay").hidden = false;
    el.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const closeAll = () => {
    $("#overlay").hidden = true;
    $("#cart").hidden = true;
    $("#quick").hidden = true;
    $("#checkout").hidden = true;
    document.body.style.overflow = "";
  };

  function quickView(id) {
    const p = byId(id);
    $("#qImg").src = p.img;
    $("#qImg").alt = p.name;
    $("#qCat").textContent = CATS[p.cat];
    $("#qName").textContent = p.name;
    $("#qPrice").textContent = money(p.price);
    $("#qOld").hidden = !p.old;
    $("#qOld").textContent = p.old ? money(p.old) : "";
    const st = $("#qStock");
    st.textContent = p.stock ? "В наличии, отправим сегодня" : "Под заказ, привезём за 10–14 дней";
    st.classList.toggle("out", !p.stock);
    const btn = $("#qAdd");
    btn.dataset.id = id;
    btn.disabled = !p.stock;
    btn.textContent = p.stock ? "В корзину" : "Нет в наличии";
    openBox($("#quick"));
  }

  /* ===== ОФОРМЛЕНИЕ ===== */

  function showStep(step) {
    $("#coForm").hidden = step !== 1;
    $("#payScreen").hidden = step !== 2;
    $("#doneScreen").hidden = step !== 3;
    $("#stepPay").classList.toggle("on", step >= 2);
    $("#stepDone").classList.toggle("on", step >= 3);
  }

  const phoneOk = (v) => (v.match(/\d/g) || []).length >= 10;
  const mailOk = (v) => /^[^@\s]+@[^@\s]+\.[a-zа-я]{2,}$/i.test(v.trim());

  function validate() {
    const fields = [
      [$("#coName"), (v) => v.trim().length >= 2],
      [$("#coPhone"), phoneOk],
      [$("#coMail"), mailOk],
    ];
    if (!$("#addrField").hidden) fields.push([$("#coAddr"), (v) => v.trim().length >= 5]);

    let ok = true;
    for (const [el, test] of fields) {
      const good = test(el.value);
      el.classList.toggle("bad", !good);
      if (!good && ok) el.focus();
      ok = ok && good;
    }
    return ok;
  }

  /* ===== ЗАПУСК ===== */

  function init() {
    // фильтр по разделам
    $("#cats").innerHTML =
      `<button class="chip on" data-cat="all">Всё</button>` +
      Object.entries(CATS)
        .map(([k, v]) => `<button class="chip" data-cat="${k}">${v}</button>`)
        .join("");

    $("#cats").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      state.shown = PAGE;
      $("#cats").querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
      render();
    });

    const reset = (fn) => (e) => {
      fn(e);
      state.shown = PAGE;
      render();
    };

    $("#q").addEventListener("input", reset((e) => (state.q = e.target.value)));
    $("#pmin").addEventListener("input", reset((e) => (state.min = e.target.value ? +e.target.value : null)));
    $("#pmax").addEventListener("input", reset((e) => (state.max = e.target.value ? +e.target.value : null)));
    $("#onlyStock").addEventListener("change", reset((e) => (state.stock = e.target.checked)));
    $("#onlySale").addEventListener("change", reset((e) => (state.sale = e.target.checked)));
    $("#sort").addEventListener("change", reset((e) => (state.sort = e.target.value)));

    $("#resetBtn").addEventListener("click", () => {
      Object.assign(state, { cat: "all", min: null, max: null, stock: false, sale: false, q: "", shown: PAGE });
      $("#q").value = "";
      $("#pmin").value = "";
      $("#pmax").value = "";
      $("#onlyStock").checked = false;
      $("#onlySale").checked = false;
      $("#cats").querySelectorAll(".chip").forEach((c, i) => c.classList.toggle("on", i === 0));
      render();
    });

    $("#moreBtn").addEventListener("click", () => {
      state.shown += PAGE;
      render();
    });

    $("#filtersBtn").addEventListener("click", (e) => {
      const open = $("#filters").classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", String(open));
    });

    $("#searchBtn").addEventListener("click", () => {
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => $("#q").focus(), 400);
    });

    // карточки товара
    $("#grid").addEventListener("click", (e) => {
      const open = e.target.closest("[data-open]");
      if (open) return quickView(open.dataset.open);
      const plus = e.target.closest("[data-add]");
      if (plus && !cart.has(plus.dataset.add)) add(plus.dataset.add);
      else if (plus) openBox($("#cart"));
    });

    $("#qAdd").addEventListener("click", (e) => {
      add(e.currentTarget.dataset.id);
      closeAll();
      openBox($("#cart"));
    });

    // корзина
    $("#cartBtn").addEventListener("click", () => openBox($("#cart")));
    $("#cartBody").addEventListener("click", (e) => {
      const b = e.target.closest("[data-step]");
      if (b) add(b.dataset.id, +b.dataset.step);
    });

    $("#promoBtn").addEventListener("click", () => {
      const val = $("#promo").value.trim().toUpperCase();
      const msg = $("#promoMsg");
      state.promo = val === SHOP.promo;
      msg.hidden = false;
      msg.className = "promo-msg " + (state.promo ? "ok" : "no");
      msg.textContent = state.promo
        ? `Промокод принят: −${SHOP.promo_off}% на товары`
        : "Такого промокода нет. Попробуйте ОХРА10";
      drawCart();
    });

    $("#checkoutBtn").addEventListener("click", () => {
      closeAll();
      showStep(1);
      openBox($("#checkout"));
    });

    // способ получения: самовывоз — без адреса и без доставки
    $("#coWay").addEventListener("change", (e) => {
      $("#addrField").hidden = e.target.value === "self";
      drawCart();
    });

    $("#coForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      showStep(2);
      $("#payBtn").textContent = payLabel();
      $("#checkout").scrollTop = 0;
    });

    $("#payBack").addEventListener("click", () => showStep(1));

    // при оплате курьеру кнопка не должна обещать списание денег
    const payLabel = () => {
      const m = document.querySelector('input[name="pm"]:checked').value;
      return m === "later" ? "Подтвердить заказ" : "Оплатить " + $("#payAmount").textContent;
    };
    $("#payWays").addEventListener("change", () => ($("#payBtn").textContent = payLabel()));

    $("#payBtn").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const back = payLabel();
      btn.disabled = true;
      btn.textContent = "Обрабатываем…";
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = back;
        $("#orderNo").textContent = "OH-" + String(Date.now()).slice(-6);
        $("#doneMail").textContent = $("#coMail").value.trim();
        $("#donePhone").textContent = $("#coPhone").value.trim();
        cart.clear();
        state.promo = false;
        saveCart();
        drawCart();
        render();
        showStep(3);
      }, 1200);
    });

    $("#doneClose").addEventListener("click", closeAll);
    $("#cartClose").addEventListener("click", closeAll);
    $("#quickClose").addEventListener("click", closeAll);
    $("#coClose").addEventListener("click", closeAll);
    $("#overlay").addEventListener("click", closeAll);
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeAll());

    loadCart();
    render();
    drawCart();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
