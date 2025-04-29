const init = () => {
  const loginFormEl = document.querySelector("#login-form");

  if (!loginFormEl) throw "no #login-form element";

  loginFormEl.addEventListener("submit", handleSubmit);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const email = formData.get("email");
  const password = formData.get("password");

  const jsonData = {
    email,
    password,
  };

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      alert("Login failed");

      return;
    }

    alert("Login success");
  } catch (error) {
    alert("Network error:", +error.message);
  }
};

document.addEventListener("DOMContentLoaded", init);
