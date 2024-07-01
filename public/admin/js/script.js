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
const formSearch = document.querySelector("[form-search");
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
}

// End form search

// Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
    let url = new URL(window.location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);
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
            console.log(link);
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
    // End Check Item
}


// Box Actions
const boxActions = document.querySelector("[box-actions]");
if(boxActions) {
    const button = boxActions.querySelector("button");

    button.addEventListener("click", () => {
        const select = boxActions.querySelector("select");
        const status = select.value;

        const listInputChecked = document.querySelectorAll("input[name='checkItem']:checked")
        const ids = [];
        listInputChecked.forEach(input => {
            ids.push(input.value);
        });

        if(status != "" && ids.length > 0) {
            // console.log(status);
            // console.log(ids);

            const dataChangeMulti = {
                status: status,
                ids: ids
            }

            const link = boxActions.getAttribute("box-actions");

            // console.log(dataChangeMulti);

            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataChangeMulti),
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200) {
                        window.location.reload();
                    }
                })
        } else {
            alert("Hành động và checkItem phải được chọn")
        }
    })
}
// End Box Actions

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
// End Xóa bản ghi