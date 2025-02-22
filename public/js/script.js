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

// Đặt hàng 
const btnAddCart = document.querySelector(".btn-add-cart");

if(btnAddCart) {
    btnAddCart.addEventListener("click", () => {
        const inputQuantity = document.querySelector("[name='quantity']")
        const value = inputQuantity.value

        const path = btnAddCart.getAttribute('link');
        console.log(path);
        
        fetch(path, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({quantity: value})
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if(data.code == 200 ){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thêm vào giỏ hàng thành công",
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        window.location.reload();
                    });
                } else if(data.code == 401) {
                    window.location.href = "/user/login"
                }
            })
    })
}
// End đặt hàng 

// Buy now 
const btnBuyNow = document.querySelector(".btn-buy-now");

if(btnBuyNow) {
    btnBuyNow.addEventListener("click", () => {
        const inputQuantity = document.querySelector("[name='quantity']")
        const value = inputQuantity.value

        const path = btnBuyNow.getAttribute('link');
        console.log(path);
        
        fetch(path, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({quantity: value})
        })
            .then(res => res.json())
            .then(data => {
                if(data.code == 200 ){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Chuyển hướng tới thanh toán",
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        window.location.href = "/checkout"
                    });
                } else if(data.code == 401) {
                    window.location.href = "/user/login"
                }
            })
    })
}
// End buy now 

// Show-alert
const showAlert = document.querySelector("[show-alert");

if(showAlert) {
    let time = showAlert.getAttribute("show-alert") || 3000;
    time = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, time);
}
// End show-alert

// Button cart delete 
const btnCartDelete = document.querySelector("[btn-cart-delete]")

if(btnCartDelete) {
    btnCartDelete.addEventListener("click", () => {
        const link = btnCartDelete.getAttribute("link")

        fetch(link, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa khỏi giỏ hàng thành công",
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                });
            })
    })
}

// End button cart delete

// Cập nhật số lượng sản phẩm trong giỏ hàng
const listInputQuantityCart = document.querySelectorAll("input[name='quantity-cart']");

if(listInputQuantityCart.length > 0) {
    listInputQuantityCart.forEach(input => {
        input.addEventListener("change", () => {
            const bookId = input.getAttribute("book-id");
            const quantity = parseInt(input.value);


            if(bookId && quantity > 0) {
                link = `/cart/update/${bookId}/${quantity}`
                fetch(link, {
                    method: "PATCH"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == 200) {
                            window.location.reload();
                        }
                    })
            }
        })
    })
}
// End Cập nhật số lượng sản phẩm trong giỏ hàng


const btnSaveProfile = document.querySelector('#btnSaveProfile');

// Readonly form
document.querySelectorAll('#my-profile input').forEach(input => input.readOnly = true);
// End readonly form 

// Edit readonly form 
const btnEditProfile = document.querySelector('#btnEditProfile')
if(btnEditProfile) {
    btnEditProfile.addEventListener("click", () => {
    
        btnSaveProfile.classList.remove("hidden");
        btnEditProfile.classList.add("hidden")

        document.querySelectorAll('#my-profile input').forEach(input => input.readOnly = false);
    })
}
// End edit readonly form 

// Edit profile avatar
const btnEditAvatar = document.querySelector('#btnEditAvatar')
if(btnEditAvatar) {
    const formEditAvatar = document.querySelector('.formEditAvatar')
    btnEditAvatar.addEventListener("click", () => {
        formEditAvatar.classList.remove("hidden");
        btnEditAvatar.classList.add("hidden");
    })
}
// End edit profile avatar 

// Save profile avatar
const btnSaveAvatar = document.querySelector('#btnSaveAvatar')
if(btnSaveAvatar) {
    const formEditAvatar = document.querySelector('.formEditAvatar')
    btnSaveAvatar.addEventListener("click", () => {
        formEditAvatar.classList.add("hidden");
        btnEditAvatar.classList.remove("hidden");
    })
}

// End save profile avatar 

// Upload preview avatar
const uploadImage = document.querySelector("[upload-image]");

if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End upload preview avatar