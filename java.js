document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. API Fetching (Fixed Loading Issue) ---
    const productList = document.getElementById('product-list');

    async function loadProducts() {
        try {
            // Using a reliable limit query
            const res = await fetch('https://dummyjson.com/products?limit=6');
            
            if (!res.ok) throw new Error('Network response was not ok');
            
            const data = await res.json();
            
            // Clear "Loading..." text
            productList.innerHTML = '';

            data.products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                
                card.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="price">$${product.price}</p>
                    <button class="btn-add">Add to Cart</button>
                `;
                productList.appendChild(card);
            });

        } catch (error) {
            console.error('Error:', error);
            productList.innerHTML = '<p style="color:red; font-size:1.2rem;">Failed to load products. Please try again later.</p>';
        }
    }

    loadProducts();


    // --- 2. Burger Menu (Fixed Mobile Click) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });


    // --- 3. Form Validation (Fixed Errors not showing) ---
    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Helper functions
    function setError(element, message) {
        // Find the closest parent with class 'form-group'
        const inputControl = element.closest('.form-group');
        const errorDisplay = inputControl.querySelector('.error-msg');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    function setSuccess(element) {
        const inputControl = element.closest('.form-group');
        const errorDisplay = inputControl.querySelector('.error-msg');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    function isValidEmail(e) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(e).toLowerCase());
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop form from submitting automatically
        let isValid = true;

        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        // Validate Username
        if (usernameValue === '') {
            setError(username, 'Username is required');
            isValid = false;
        } else {
            setSuccess(username);
        }

        // Validate Email
        if (emailValue === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Validate Password
        if (passwordValue === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 6) {
            setError(password, 'Password must be at least 6 characters.');
            isValid = false;
        } else {
            setSuccess(password);
        }

        if (isValid) {
            alert('Registration Successful!');
            form.reset();
            // Clear success styles
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
        }
    });

    // Toggle Password Visibility
    const togglePassword = document.getElementById('togglePassword');
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });


    // --- 4. Cookie Banner (Fixed Popup) ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // FOR TESTING: Uncomment the line below to reset cookies every time you refresh
    // localStorage.removeItem('cookiesAccepted'); 

    // Check if user already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.remove('hidden');
        }, 1000); // Show after 1 second
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.add('hidden');
    });


    // --- 5. Scroll To Top ---
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});