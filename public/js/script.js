// Bar search
const barSearch = document.querySelector("[bar-search]");
if(barSearch) {
    let url = new URL(window.location.href);

    barSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href;
    })
}

// End bar search

// Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
    let url = new URL(window.location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            if(page == 1) {
                url.searchParams.delete("page");
            } else {
                url.searchParams.set("page", page);
            }
            window.location.href = url.href;
        })
    })
}
// End pagination

// Rating star
const ratingRange = document.querySelector('[rating-range]')
const ratingSection = document.querySelector(".rating-section");

if(ratingRange) {
    const fiveStar = document.querySelector('.five-star')
    const fourStar = document.querySelector('.four-star');
    const threeStar = document.querySelector('.three-star')
    const twoStar = document.querySelector('.two-star')
    const oneStar = document.querySelector('.one-star')
    
    let value = parseInt(ratingRange.value);

    switch (value) {
        case 5:
            fiveStar.classList.remove("hidden");
            fourStar.classList.add("hidden");
            threeStar.classList.add("hidden");
            twoStar.classList.add("hidden");
            oneStar.classList.add("hidden");
            break;
        case 4:
            fiveStar.classList.add("hidden");
            fourStar.classList.remove("hidden");
            threeStar.classList.add("hidden");
            twoStar.classList.add("hidden");
            oneStar.classList.add("hidden");
            break;
        case 3:
            fiveStar.classList.add("hidden");
            fourStar.classList.add("hidden");
            threeStar.classList.remove("hidden");
            twoStar.classList.add("hidden");
            oneStar.classList.add("hidden");
            break;
        case 2:
            fiveStar.classList.add("hidden");
            fourStar.classList.add("hidden");
            threeStar.classList.add("hidden");
            twoStar.classList.remove("hidden");
            oneStar.classList.add("hidden");
            break;
        case 1:
            fiveStar.classList.add("hidden");
            fourStar.classList.add("hidden");
            threeStar.classList.add("hidden");
            twoStar.classList.add("hidden");
            oneStar.classList.remove("hidden");
            break;
        default:
            break;
    }

    ratingRange.addEventListener("change", () => {
        value = parseInt(ratingRange.value);

        switch (value) {
            case 5:
                fiveStar.classList.remove("hidden");
                fourStar.classList.add("hidden");
                threeStar.classList.add("hidden");
                twoStar.classList.add("hidden");
                oneStar.classList.add("hidden");
                break;
            case 4:
                fiveStar.classList.add("hidden");
                fourStar.classList.remove("hidden");
                threeStar.classList.add("hidden");
                twoStar.classList.add("hidden");
                oneStar.classList.add("hidden");
                break;
            case 3:
                fiveStar.classList.add("hidden");
                fourStar.classList.add("hidden");
                threeStar.classList.remove("hidden");
                twoStar.classList.add("hidden");
                oneStar.classList.add("hidden");
                break;
            case 2:
                fiveStar.classList.add("hidden");
                fourStar.classList.add("hidden");
                threeStar.classList.add("hidden");
                twoStar.classList.remove("hidden");
                oneStar.classList.add("hidden");
                break;
            case 1:
                fiveStar.classList.add("hidden");
                fourStar.classList.add("hidden");
                threeStar.classList.add("hidden");
                twoStar.classList.add("hidden");
                oneStar.classList.remove("hidden");
                break;
            default:
                break;
        }
    })

    ratingRange.addEventListener("input", () => {

    })

    ratingSection.addEventListener("click", () => {
        ratingRange.removeAttribute('disabled');
    })
}
// End rating star

// Form apply
const formApply = document.querySelector("[form-apply]");

if(formApply) {
    let url = new URL(window.location.href);

    formApply.addEventListener("submit", (event) => {
        event.preventDefault();
        // console.log(event);

        const listInputCheckCategory = document.querySelectorAll("input[name='checkCategory']:checked");
        let categories = []

        listInputCheckCategory.forEach((item) => {
            categories.push(item.getAttribute('value'));
        })

        const lowPrice = document.querySelector("input[name='low-price']").value;
        const highPrice = document.querySelector("input[name='high-price']").value;

        let rating = 0
        if(!ratingRange.hasAttribute('disabled')) {
            rating = ratingRange.value;
        }

        if(categories) {
            if(url.searchParams.has("categories")) {
                url.searchParams.delete("categories");
            }
            categories.forEach((item) => {
                url.searchParams.append("categories", item);
            })
        } else {
            url.searchParams.delete("categories");
        }

        if(lowPrice) {
            if(url.searchParams.has("lowPrice")) {
                url.searchParams.delete("lowPrice");
            }
            url.searchParams.set("lowPrice", lowPrice);
        } else {
            url.searchParams.delete("lowPrice");
        }   

        if(highPrice) {
            if(url.searchParams.has("highPrice")) {
                url.searchParams.delete("highPrice");
            }
            url.searchParams.set("highPrice", highPrice);
        } else {
            url.searchParams.delete("highPrice");
        }

        if(rating != 0) {
            if(url.searchParams.has("rating")) {
                url.searchParams.delete("rating");
            }
            url.searchParams.set("rating", rating);
        } else {
            url.searchParams.delete("rating");
        }

        window.location.href = url.href;
    })
}
// End form apply

// Reset
const btnReset = document.querySelector('.btn-reset')

if(btnReset) {
    btnReset.addEventListener("click", () => {
        window.location.href = window.location.pathname;
    })
}
// End reset

// Cập nhật số lượng sản phẩm trong giỏ hàng
const listInputQuantity = document.querySelectorAll("[cart] input[name='quantity']");
if(listInputQuantity.length > 0) {
    listInputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("product-id");
            const quantity = parseInt(input.value);

            if(productId && quantity > 0) {
                window.location.href = `/cart/update/${productId}/${quantity}`
            }
        })
    })
}
// End Cập nhật số lượng sản phẩm trong giỏ hàng