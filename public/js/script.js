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