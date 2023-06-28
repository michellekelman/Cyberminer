let currentPage;

function disableButton(button) {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
}

function enableButton(button) {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
}

function edgeButtonControl() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    if (currentPage == 1) {
        disableButton(prevButton);
    }
    else {
        enableButton(prevButton);
    }
    const oneDoc = document.querySelectorAll(".one-doc");
    const resultsNum = document.getElementById("results-num").value;
    const pageCount = Math.ceil(oneDoc.length / resultsNum);
    if (currentPage == pageCount) {
        disableButton(nextButton);
    }
    else {
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
        }
    }
}

function appendPageButton(index) {
    const pageNumbers = document.getElementById("page-numbers");
    const pageNumberLi = document.createElement("li");
    pageNumberLi.className = "page-item";
    pageNumberLi.value = index;
    const pageNumberA = document.createElement("a");
    pageNumberA.className = "page-link";
    pageNumberA.innerHTML = index;
    pageNumberLi.appendChild(pageNumberA);
    pageNumbers.appendChild(pageNumberLi);
}

function appendPageButtons() {
    // prev button
    const pageNumbers = document.getElementById("page-numbers");
    const pageNumberLiPrev = document.createElement("li");
    pageNumberLiPrev.className = "page-item";
    pageNumberLiPrev.id = "prev-button";
    const pageNumberAPrev = document.createElement("a");
    pageNumberAPrev.className = "page-link";
    pageNumberAPrev.innerHTML = "&lt";
    pageNumberLiPrev.appendChild(pageNumberAPrev);
    pageNumbers.appendChild(pageNumberLiPrev);
    // middle buttons
    const oneDoc = document.querySelectorAll(".one-doc");
    const resultsNum = document.getElementById("results-num").value;
    const pageCount = Math.ceil(oneDoc.length / resultsNum);
    for (let i = 1; i <= pageCount; i++) {
        appendPageButton(i);
    }
    // next button
    const pageNumberLiNext = document.createElement("li");
    pageNumberLiNext.className = "page-item";
    pageNumberLiNext.id = "next-button";
    const pageNumberANext = document.createElement("a");
    pageNumberANext.className = "page-link";
    pageNumberANext.innerHTML = "&gt";
    pageNumberLiNext.appendChild(pageNumberANext);
    pageNumbers.appendChild(pageNumberLiNext);
}

function resetPageButtons() {
    const pageNumbers = document.querySelectorAll(".page-item");
    for (let i = 0; i < pageNumbers.length; i++) {
        pageNumbers[i].remove();
    }
}

function displayCurrentPageResults(pageNum) {
    currentPage = pageNum;
    edgeButtonControl();
    setActivePageButton();
    const resultsNum = document.getElementById("results-num").value;
    const prevRange = (pageNum - 1) * resultsNum;
    const currRange = pageNum * resultsNum;
    const oneDoc = document.querySelectorAll(".one-doc");
    for (let i = 0; i < oneDoc.length; i++) {
        oneDoc[i].classList.add("d-none");
        if (i >= prevRange && i < currRange) {
            oneDoc[i].classList.remove("d-none");
        }
    }
}

function loadPagination() {
    resetPageButtons();
    appendPageButtons();
    displayCurrentPageResults(1);
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    prevButton.addEventListener("click", () => {
        displayCurrentPageResults(currentPage-1);
    });
    nextButton.addEventListener("click", () => {
        displayCurrentPageResults(currentPage+1);
    });
    const pageNumbers = document.querySelectorAll(".page-item");
    for (let i = 0; i < pageNumbers.length; i++) {
        const pageIndex = pageNumbers[i].value;
        if (pageIndex) {
            pageNumbers[i].addEventListener("click", () => {
                displayCurrentPageResults(pageIndex);
            });
        };
    };
    const resultsNum = document.getElementById("results-num");
    resultsNum.addEventListener("change", () => {
        loadPagination();
    });
}