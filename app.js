const API_BASE_URL = "https://checkin-time.onrender.com";  // Đổi thành địa chỉ của API
// const API_BASE_URL = "http://localhost:8080"; 

// Xử lý thêm người dùng mới
document.getElementById("addUserForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${API_BASE_URL}/api/adduser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Thêm người dùng thành công!");
                document.getElementById("addUserForm").reset();
                // fetchUsers();
            } else {
                alert("Có lỗi xảy ra: " + data.message);
            }
        })
        .catch(error => console.error("Error:", error));
});

// Lấy danh sách người dùng
function fetchUsers() {
    fetch(`${API_BASE_URL}/api/getdanhsachuser`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Thay đổi `data.data` thành `data.obj`
                renderUserTable(data.obj);
            } else {
                alert("Có lỗi khi tải danh sách người dùng");
            }
        })
        .catch(error => console.error("Error:", error));
}


function checkOutUser(username, password) {
    const url = `${API_BASE_URL}/checkouttay?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        Swal.fire({
            title: 'Notification',
            text: data.obj,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`An error occurred: ${error.message}`); // Hiển thị thông báo lỗi
    });
}


function checkInUser(username, password) {
    const url = `${API_BASE_URL}/checkintay?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        Swal.fire({
            title: 'Notification',
            text: data.obj,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`An error occurred: ${error.message}`); // Hiển thị thông báo lỗi
    });
}
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.visibility = "visible";

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.visibility = "hidden";
    }, 5000);
}
// Sửa đổi hàm renderUserTable để thêm sự kiện vào nút Check-in và Check-out
function renderUserTable(users) {
    const tbody = document.getElementById("userTable").querySelector("tbody");
    tbody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.setAttribute("data-username", user.username);

        row.innerHTML = `
            <td>${user.username}</td>
            <td><input type="password" value="${user.password}" data-username="${user.username}"></td>
            <td>${user.deviceId || ""}</td>
            <td>${user.deviceName || ""}</td>
            <td><input type="checkbox" ${user.check_auto === "true" ? "checked" : ""} data-username="${user.username}" onchange="updateUser(this)"></td>
            <td>
                <button onclick="openPasswordPopup('${user.username}')">Cập Nhật Mật Khẩu</button>
                <button onclick="checkInUser('${user.username}', '${user.password}')"><i class="fa fa-sign-in-alt"></i> Check-in</button>
                <button onclick="checkOutUser('${user.username}', '${user.password}')"><i class="fa fa-sign-out-alt"></i> Check-out</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm gọi API để lấy Device và Token
function getDeviceToken() {
    fetch(`${API_BASE_URL}/api/gettoken`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {   
                    Swal.fire({
                        title: 'Notification',
                        text: 'Lấy Device và Token thành công',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
            } else {
                Swal.fire({
                    title: 'Notification',
                    text: "Có lỗi khi lấy thông tin: " + data.message,
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
               
            }
        })
        .catch(error => console.error("Error:", error));
}

function checkInAll() {
    fetch(`${API_BASE_URL}/checkin`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Notification',
                    text: 'Checkin All thành công',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
        } else {
            Swal.fire({
                title: 'Notification',
                text: "Có lỗi khi lấy thông tin: " + data.message,
                icon: 'info',
                confirmButtonText: 'OK'
            });
           
        }
        })
        .catch(error => console.error("Error:", error));
}

function checkOutAll() {
    fetch(`${API_BASE_URL}/checkout`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Notification',
                    text: 'Checkout All thành công',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
        } else {
            Swal.fire({
                title: 'Notification',
                text: "Có lỗi khi lấy thông tin: " + data.message,
                icon: 'info',
                confirmButtonText: 'OK'
            });
           
            }
        })
        .catch(error => console.error("Error:", error));
}



function updateUser(element) {
    // Lấy `username` từ thuộc tính `data-username`
    const username = element.getAttribute("data-username");

    // Lấy toàn bộ hàng (row) của người dùng để lấy các giá trị khác nếu cần
    const row = element.closest("tr");

    // Lấy `password` từ cột `password`
    const password = row.querySelector("input[type='password']").value;

    // Lấy `check_auto` từ cột checkbox
    const checkAuto = row.querySelector("input[type='checkbox']").checked ? "true" : "false";

    // Tạo payload đầy đủ với `username`, `checkAuto`, và `password`
    const payload = {
        username: username,
        check_auto: checkAuto,
        password: password
    };

    // Gửi yêu cầu cập nhật với payload đầy đủ
    fetch(`${API_BASE_URL}/api/updateuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Notification',
                    text: "Cập nhật thành công!",
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Notification',
                    text: "Có lỗi khi cập nhật: " + data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
        .catch(error => console.error("Error:", error));
}


// Tải danh sách người dùng khi trang được load
document.addEventListener("DOMContentLoaded", fetchUsers);



// Hiển thị popup để người dùng nhập mật khẩu mới
function openPasswordPopup(username) {
    window.currentUsername = username;  // Lưu username vào biến toàn cục để dùng khi cập nhật
    document.getElementById("passwordPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Đóng popup
function closePopup() {
    document.getElementById("passwordPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    window.currentUsername = null;  // Xóa giá trị tạm của `username`
}

// Hàm gọi API cập nhật mật khẩu
// Hàm gọi API cập nhật mật khẩu
function updatePassword() {
    const newPassword = document.getElementById("newPasswordInput").value;

    if (!newPassword) {
        alert("Vui lòng nhập mật khẩu mới");
        return;
    }

    // Gọi API với `username`, `newPassword` và `checkAuto`
    fetch(`${API_BASE_URL}/api/updateuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: window.currentUsername,
            password: newPassword,
            check_auto: 'pass'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Cập nhật mật khẩu thành công!");
            closePopup();
            // fetchUsers();  // Tải lại danh sách người dùng nếu cần
        } else {
            alert("Cập nhật mật khẩu thất bại: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}
