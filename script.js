// Lắng nghe sự kiện cho nút xác thực sinh học
document.getElementById('biometric-btn').addEventListener('click', async () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Kiểm tra trình duyệt có hỗ trợ WebAuthn không
    if (!window.PublicKeyCredential) {
        Swal.fire({
            title: 'Error',
            text: 'Your browser does not support WebAuthn.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    try {
        // Cấu hình thông tin xác thực
        const publicKey = {
            challenge: Uint8Array.from('random_challenge_string', c => c.charCodeAt(0)), // Tạo một chuỗi ngẫu nhiên từ server
            rpId: window.location.hostname, // Domain hiện tại
            userVerification: "preferred" // Ưu tiên xác thực sinh học
        };

        // Thực hiện xác thực
        const credential = await navigator.credentials.get({ publicKey });

        if (credential) {
            // Sau khi xác thực, xác định người dùng (giả sử sử dụng thông tin từ backend)
            const user = {
                username: 'exampleUser', // Dữ liệu trả về từ server
                password: 'examplePassword' // Dữ liệu trả về từ server
            };

            // Điền dữ liệu vào ô username và password
            usernameInput.value = user.username;
            passwordInput.value = user.password;

            Swal.fire({
                title: 'Success',
                text: 'Biometric authentication successful!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Biometric authentication failed: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('Biometric authentication failed:', error);
    }
});
