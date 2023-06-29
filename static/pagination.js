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
    const oneDoc = document.querySelectorAll(".one-doc");
    const resultsNum = document.getElementById("results-num").value;
    const pageCount = Math.ceil(oneDoc.length / resultsNum);
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
        }
    }
}

function displayButtonRange() {
    const pageNumbers = document.querySelectorAll(".page-number");
    const oneDoc = document.querySelectorAll(".one-doc");
    const resultsNum = document.getElementById("results-num").value;
    const pageCount = Math.ceil(oneDoc.length / resultsNum);
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
    const pageNumberA = document.createElement("a");
    pageNumberA.className = "page-link";
    pageNumberA.innerHTML = index;
    pageNumberLi.appendChild(pageNumberA);
    pageNumbers.appendChild(pageNumberLi);
}

function appendPageButtons() {
    // first button
    const pageNumbers = document.getElementById("page-numbers");
    const pageNumberLiFirst = document.createElement("li");
    pageNumberLiFirst.className = "page-item";
    pageNumberLiFirst.id = "first-button";
    const pageNumberAFirst = document.createElement("a");
    pageNumberAFirst.className = "page-link";
    pageNumberAFirst.innerHTML = "&lt&lt";
    pageNumberLiFirst.appendChild(pageNumberAFirst);
    pageNumbers.appendChild(pageNumberLiFirst);
    // prev button
    const pageNumberLiPrev = document.createElement("li");
    pageNumberLiPrev.className = "page-item";
    pageNumberLiPrev.id = "prev-button";
    const pageNumberAPrev = document.createElement("a");
    pageNumberAPrev.className = "page-link";
    pageNumberAPrev.innerHTML = "&lt";
    pageNumberLiPrev.appendChild(pageNumberAPrev);
    pageNumbers.appendChild(pageNumberLiPrev);
    // ... button 1
    const pageNumberLiDot1 = document.createElement("li");
    pageNumberLiDot1.className = "page-item";
    pageNumberLiDot1.id = "dot-button-1";
    const pageNumberADot1 = document.createElement("a");
    pageNumberADot1.className = "page-link";
    pageNumberADot1.innerHTML = "...";
    pageNumberLiDot1.appendChild(pageNumberADot1);
    pageNumbers.appendChild(pageNumberLiDot1);
    disableButton(pageNumberLiDot1);
    // middle buttons
    const oneDoc = document.querySelectorAll(".one-doc");
    const resultsNum = document.getElementById("results-num").value;
    const pageCount = Math.ceil(oneDoc.length / resultsNum);
    for (let i = 1; i <= pageCount; i++) {
        appendPageButton(i);
    }
    // ... button 2
    const pageNumberLiDot2 = document.createElement("li");
    pageNumberLiDot2.className = "page-item";
    pageNumberLiDot2.id = "dot-button-2";
    const pageNumberADot2 = document.createElement("a");
    pageNumberADot2.className = "page-link";
    pageNumberADot2.innerHTML = "...";
    pageNumberLiDot2.appendChild(pageNumberADot2);
    pageNumbers.appendChild(pageNumberLiDot2);
    disableButton(pageNumberLiDot2);
    // next button
    const pageNumberLiNext = document.createElement("li");
    pageNumberLiNext.className = "page-item";
    pageNumberLiNext.id = "next-button";
    const pageNumberANext = document.createElement("a");
    pageNumberANext.className = "page-link";
    pageNumberANext.innerHTML = "&gt";
    pageNumberLiNext.appendChild(pageNumberANext);
    pageNumbers.appendChild(pageNumberLiNext);
    // last button
    const pageNumberLiLast = document.createElement("li");
    pageNumberLiLast.className = "page-item";
    pageNumberLiLast.id = "last-button";
    const pageNumberALast = document.createElement("a");
    pageNumberALast.className = "page-link";
    pageNumberALast.innerHTML = "&gt&gt";
    pageNumberLiLast.appendChild(pageNumberALast);
    pageNumbers.appendChild(pageNumberLiLast);
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
    displayButtonRange();
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
    const firstButton = document.getElementById("first-button");
    const lastButton = document.getElementById("last-button");
    const oneDoc = document.querySelectorAll(".one-doc");
    const resultsNum = document.getElementById("results-num");
    const pageCount = Math.ceil(oneDoc.length / resultsNum.value);
    firstButton.addEventListener("click", () => {
        displayCurrentPageResults(1);
    });
    lastButton.addEventListener("click", () => {
        displayCurrentPageResults(pageCount);
    });
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
    resultsNum.addEventListener("change", () => {
        loadPagination();
    });
}