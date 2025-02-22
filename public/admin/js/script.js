// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]"); // trả về một mảng

if(listButtonStatus.length > 0) {
    let url = new URL(window.location.href); // lấy ra cửa sổ hiện tại 

    // Bắt sự kiện click
    listButtonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            
            if(status) {
                url.searchParams.set("status", status); // thêm tính năng query 
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });

    // Thêm class active mặc định
    const statusCurrent = url.searchParams.get("status") || "";
    const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);

    buttonCurrent.classList.add("active");
}
// End Button Status

// Form search
const formSearch = document.querySelector("[form-search]");
if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();

        const keyword = event.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href;
    })

    formSearch.addEventListener("reset", (event) => {
        const keyword = event.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.delete("keyword");
            event.target.elements.keyword.value = "";
        }

        window.location.href = url.href;
    })
}

// End form search

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

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]")
if(listButtonChangeStatus.length > 0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("link");
            // console.log(link);
            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200) {
                        window.location.reload();
                    }
                })
        })
    })
}
// End Button Change Status

// Check Item
const inputCheckAll = document.querySelector("input[name='checkAll']");
if(inputCheckAll) {
    const listInputCheckItem = document.querySelectorAll("input[name='checkItem']");

    // Bắt sự kiện click vào nút checkAll
    inputCheckAll.addEventListener("click", () => {
        console.log(inputCheckAll.checked)
        listInputCheckItem.forEach(inputCheckItem => {
            inputCheckItem.checked = inputCheckAll.checked;
        })
    }); 

    // Bắt sự kiện click vào nút checkItem
    listInputCheckItem.forEach(inputCheckItem => {
        inputCheckItem.addEventListener("click", () => {
            const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");
            
            if(listInputCheckItemChecked.length == listInputCheckItem.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}

// Xóa bản ghi 
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("button-delete");

            fetch(link, {
                method: "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.code)
                    if(data.code == 200) {
                        window.location.reload(); 
                    }
                })
        })
    })
}
// End xóa bản ghi 

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

// Upload preview image 
const uploadImage = document.querySelector("[upload-image]");

if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End upload preview image

// Sort theo title
const listSortTitle = document.querySelectorAll("[sort-title]");

if(listSortTitle.length > 0) {
    let url = new URL(window.location.href);

    listSortTitle.forEach(button => {
        button.addEventListener("click", () => {
            const sortValue = button.getAttribute("sort-title");

            if(url.searchParams.has("sortAuthor")) {
                url.searchParams.delete("sortAuthor");
            }

            if(sortValue) {
                url.searchParams.set("sortTitle", sortValue);
            } else {
                url.searchParams.delete("sortTitle");
            }

            window.location.href = url.href;
        })

    })

    // Thêm class active mặc định
    const statusCurrent = url.searchParams.get("sortTitle") || "";
    const buttonCurrent = document.querySelector(`[sort-title="${statusCurrent}"]`);

    buttonCurrent.classList.add("active");
}

// Sort theo author 
const listSortAuthor = document.querySelectorAll("[sort-author]");
if(listSortAuthor.length > 0) {
    let url = new URL(window.location.href);

    listSortAuthor.forEach(button => {
        button.addEventListener("click", () => {
            const sortValue = button.getAttribute("sort-author");

            if(url.searchParams.has("sortTitle")) {
                url.searchParams.delete("sortTitle");
            }

            if(sortValue) {
                url.searchParams.set("sortAuthor", sortValue);
            } else {
                url.searchParams.delete("sortAuthor");
            }
    

            window.location.href = url.href;
        })
    })

    // Thêm class active mặc định
    const statusCurrent = url.searchParams.get("sortAuthor") || "";
    const buttonCurrent = document.querySelector(`[sort-author="${statusCurrent}"]`);

    buttonCurrent.classList.add("active");
}


// Phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener("click", () => {
        const roles = [];

        const listItemRoleId = document.querySelectorAll("[role-id]");
        for (const element of listItemRoleId) {
            const roleId = element.getAttribute("role-id");
            const role = {
                id: roleId,
                permissions: []
            }
            const listInputChecked = tablePermissions.querySelectorAll(`input[data-id="${roleId}"]:checked`); // tìm các ô input đã tích 
            
            listInputChecked.forEach(input => {
                const dataName = input.getAttribute("data-name");
                role.permissions.push(dataName)
            });
            roles.push(role);
        }

        const path = buttonSubmit.getAttribute("button-submit")

        fetch(path, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(roles)
        })
            .then(res => {
                res.json()
            })
            .then(data => {
                console.log(data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhập thành công",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    })
}
// End Phân quyền

// Password
const eyeClose = document.querySelector("[eye-close]")

if(eyeClose) {
    const icon = eyeClose.querySelector("i")

    eyeClose.addEventListener("click", () => {
        const typePassword = document.querySelector("#typePasswordX")
        if (typePassword.type == "password") {
            icon.classList.remove("fa-eye-slash")
            icon.classList.add("fa-eye")
            typePassword.type = "text";
        } else {
            icon.classList.remove("fa-eye")
            icon.classList.add("fa-eye-slash")
            typePassword.type = "password";
        }
    })
}
// End Password