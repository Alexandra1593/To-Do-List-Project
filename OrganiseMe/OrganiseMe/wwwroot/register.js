
        function register() {
            const data = {
                firstName: document.getElementById("regFirstName").value,
                lastName: document.getElementById("regLastName").value,
                email: document.getElementById("regEmail").value,
                password: document.getElementById("regPassword").value,
                dateOfBirth: document.getElementById("regDOB").value
            };

            fetch("http://localhost:5299/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.ok) alert("Registered successfully!");
                    else res.text().then(text => alert("Error: " + text));
                });
        }

        function login() {
            const data = {
                email: document.getElementById("loginEmail").value,
                password: document.getElementById("loginPassword").value
            };

            fetch("http://localhost:5299/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("token", data.token);
                    alert("Logged in! Token saved.");
                })
                .catch(() => alert("Invalid credentials"));
        }

        function getProfile() {
            fetch("http://localhost:5299/api/secure/profile", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.text())
                .then(data => alert("Profile data: " + data));
        }
   

