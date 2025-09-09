document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(el => {
        el.addEventListener("change", () => {
            let imgSrc = getImageForInput(el);
            toggleImage(el, el.checked, imgSrc, true);
        });
    });

    document.querySelectorAll("input[type='radio']").forEach(el => {
        el.addEventListener("change", () => {
            toggleBackground(el);
        });
    });

    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", () => {
            let imgSrc = getImageForSelect(select.value);
            toggleImage(select, select.value !== "", imgSrc, true);
        });
    });

    document.querySelectorAll("input[type='text']").forEach(input => {
        let output = document.createElement("div");
        output.classList.add("text-output");
        input.insertAdjacentElement("afterend", output);

        input.addEventListener("input", () => {
            output.textContent = input.value
                ? `You typed: ${input.value}`
                : "";
        });
    });
});

function showTab(tabId) {
    document.getElementById('tab1').style.display = 'none';
    document.getElementById('tab2').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
    document.getElementById('btn1').classList.remove('active');
    document.getElementById('btn2').classList.remove('active');
    document.getElementById(tabId === 'tab1' ? 'btn1' : 'btn2').classList.add('active');
}

function getImageForInput(el) {
    let labelText = el.parentNode.textContent.trim().toLowerCase();
    if (labelText.includes("pizza")) return "public/pizza.png";
    if (labelText.includes("burger")) return "public/burger.png";
    if (labelText.includes("pasta")) return "public/pasta.png";
    return "https://i.ibb.co/7yJ9cYh/smile.png"; // дефолт
}

function getImageForSelect(value) {
    let val = value.toLowerCase();
    if (val.includes("apple")) return "public/apple.png";
    if (val.includes("banana")) return "public/banana.png";
    if (val.includes("orange")) return "public/orange.png";
    return "https://i.ibb.co/7yJ9cYh/smile.png"; // дефолт
}

function toggleImage(el, isActive, src = null, replace = false) {
    let existingImg = el.parentNode.querySelector(".status-img");

    if (isActive) {
        if (!existingImg || replace) {
            if (existingImg) existingImg.remove();
            let img = document.createElement("img");
            img.src = src || "/smile.png";
            img.classList.add("status-img");
            img.style.width = "30px";
            img.style.height = "30px";
            img.style.marginLeft = "8px";
            img.style.verticalAlign = "middle";
            el.parentNode.appendChild(img);
        }
    } else {
        if (existingImg) existingImg.remove();
    }
}

function toggleBackground(radio) {
    let groupName = radio.name;
    let radios = document.querySelectorAll(`input[name='${groupName}']`);

    radios.forEach(r => {
        let parent = r.parentNode;
        parent.style.backgroundColor = "";
        parent.style.color = "";
        parent.style.padding = "2px 6px";
        parent.style.borderRadius = "6px";
    });

    if (radio.checked) {
        const color = radio.parentNode.textContent.trim().toLowerCase();
        radio.parentNode.style.backgroundColor = color;
        radio.parentNode.style.color = "#fff";
    }
}
