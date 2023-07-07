let totalDocs;
let currentPage;
let resultsNum;

function disableButton(button) {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
}

function enableButton(button) {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
}

function edgeButtonControl() {
    const firstButton = document.getElementById("first-button");
    const lastButton = document.getElementById("last-button");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    if (currentPage == 1) {
        disableButton(firstButton);
        disableButton(prevButton);
    }
    else {
        enableButton(firstButton);
        enableButton(prevButton);
    }
    const pageCount = Math.ceil(totalDocs / resultsNum);
    if (currentPage == pageCount) {
        disableButton(lastButton);
        disableButton(nextButton);
    }
    else {
        enableButton(lastButton);
        enableButton(nextButton);
    }
}

function setActivePageButton() {
    const pageNumbers = document.querySelectorAll(".page-item");
    for (let i = 0; i < pageNumbers.length; i++) {
        pageNumbers[i].classList.remove("active");
        const pageIndex = pageNumbers[i].value;
        if (pageIndex == currentPage) {
            pageNumbers[i].classList.add("active");
            pageNumbers[i].setAttribute("name", "page");
        }
    }
}

function displayButtonRange() {
    const pageNumbers = document.querySelectorAll(".page-number");
    const pageCount = Math.ceil(totalDocs / resultsNum);
    const dotButton1 = document.getElementById("dot-button-1");
    const dotButton2 = document.getElementById("dot-button-2");
    for (let i = 0; i < pageNumbers.length; i++) {
        pageNumbers[i].classList.remove("d-none");
    }
    dotButton1.classList.add("d-none");
    dotButton2.classList.add("d-none");
    if (pageCount > 10) {
        if (currentPage < 5) {
            for (let i = 0; i < pageNumbers.length; i++) {
                if (i > 4) {
                    pageNumbers[i].classList.add("d-none");
                }
            }
            dotButton2.classList.remove("d-none");
        }
        else if (currentPage > pageCount-4) {
            for (let i = 0; i < pageNumbers.length; i++) {
                if (i < pageCount-5) {
                    pageNumbers[i].classList.add("d-none");
                }
            }
            dotButton1.classList.remove("d-none");
        }
        else {
            for (let i = 0; i < pageNumbers.length; i++) {
                if (i < currentPage-3 || i > currentPage+1) {
                    pageNumbers[i].classList.add("d-none");
                }
            }
            dotButton1.classList.remove("d-none");
            dotButton2.classList.remove("d-none");
        }
    }
}

function appendPageButton(index) {
    const pageNumbers = document.getElementById("page-numbers");
    const pageNumberLi = document.createElement("li");
    pageNumberLi.className = "page-item";
    pageNumberLi.classList.add("page-number");
    pageNumberLi.value = index;
    const pageNumberA = document.createElement("button");
    pageNumberA.className = "page-link";
    pageNumberA.setAttribute("form", "searchForm");
    pageNumberA.setAttribute("type", "submit");
    pageNumberA.setAttribute("name", "newPage");
    pageNumberA.innerHTML = index;
    pageNumberA.value = index;
    pageNumberLi.appendChild(pageNumberA);
    pageNumbers.appendChild(pageNumberLi);
}

function appendPageButtons() {
    // first button
    const pageNumbers = document.getElementById("page-numbers");
    const pageNumberLiFirst = document.createElement("li");
    pageNumberLiFirst.className = "page-item";
    pageNumberLiFirst.id = "first-button";
    const pageNumberAFirst = document.createElement("button");
    pageNumberAFirst.className = "page-link";
    pageNumberAFirst.setAttribute("form", "searchForm");
    pageNumberAFirst.setAttribute("type", "submit");
    pageNumberAFirst.setAttribute("name", "newPage");
    pageNumberAFirst.innerHTML = "&lt&lt";
    pageNumberAFirst.value = "first";
    pageNumberLiFirst.appendChild(pageNumberAFirst);
    pageNumbers.appendChild(pageNumberLiFirst);
    // prev button
    const pageNumberLiPrev = document.createElement("li");
    pageNumberLiPrev.className = "page-item";
    pageNumberLiPrev.id = "prev-button";
    const pageNumberAPrev = document.createElement("button");
    pageNumberAPrev.className = "page-link";
    pageNumberAPrev.setAttribute("form", "searchForm");
    pageNumberAPrev.setAttribute("type", "submit");
    pageNumberAPrev.setAttribute("name", "newPage");
    pageNumberAPrev.innerHTML = "&lt";
    pageNumberAPrev.value = "prev";
    pageNumberLiPrev.appendChild(pageNumberAPrev);
    pageNumbers.appendChild(pageNumberLiPrev);
    // ... button 1
    const pageNumberLiDot1 = document.createElement("li");
    pageNumberLiDot1.className = "page-item";
    pageNumberLiDot1.id = "dot-button-1";
    const pageNumberADot1 = document.createElement("button");
    pageNumberADot1.className = "page-link";
    pageNumberADot1.innerHTML = "...";
    pageNumberLiDot1.appendChild(pageNumberADot1);
    pageNumbers.appendChild(pageNumberLiDot1);
    disableButton(pageNumberLiDot1);
    // middle buttons
    const pageCount = Math.ceil(totalDocs / resultsNum);
    for (let i = 1; i <= pageCount; i++) {
        appendPageButton(i);
    }
    // ... button 2
    const pageNumberLiDot2 = document.createElement("li");
    pageNumberLiDot2.className = "page-item";
    pageNumberLiDot2.id = "dot-button-2";
    const pageNumberADot2 = document.createElement("button");
    pageNumberADot2.className = "page-link";
    pageNumberADot2.innerHTML = "...";
    pageNumberLiDot2.appendChild(pageNumberADot2);
    pageNumbers.appendChild(pageNumberLiDot2);
    disableButton(pageNumberLiDot2);
    // next button
    const pageNumberLiNext = document.createElement("li");
    pageNumberLiNext.className = "page-item";
    pageNumberLiNext.id = "next-button";
    const pageNumberANext = document.createElement("button");
    pageNumberANext.className = "page-link";
    pageNumberANext.setAttribute("form", "searchForm");
    pageNumberANext.setAttribute("type", "submit");
    pageNumberANext.setAttribute("name", "newPage");
    pageNumberANext.innerHTML = "&gt";
    pageNumberANext.value = "next";
    pageNumberLiNext.appendChild(pageNumberANext);
    pageNumbers.appendChild(pageNumberLiNext);
    // last button
    const pageNumberLiLast = document.createElement("li");
    pageNumberLiLast.className = "page-item";
    pageNumberLiLast.id = "last-button";
    const pageNumberALast = document.createElement("button");
    pageNumberALast.className = "page-link";
    pageNumberALast.setAttribute("form", "searchForm");
    pageNumberALast.setAttribute("type", "submit");
    pageNumberALast.setAttribute("name", "newPage")
    pageNumberALast.innerHTML = "&gt&gt";
    pageNumberALast.value = "last";
    pageNumberLiLast.appendChild(pageNumberALast);
    pageNumbers.appendChild(pageNumberLiLast);
}

function resetPageButtons() {
    const pageNumbers = document.querySelectorAll(".page-item");
    for (let i = 0; i < pageNumbers.length; i++) {
        pageNumbers[i].remove();
    }
}

function loadPagination(total, page, results) {
    totalDocs = total;
    currentPage = page;
    resultsNum = results;
    resetPageButtons();
    appendPageButtons();
    edgeButtonControl();
    setActivePageButton();
    displayButtonRange();
}