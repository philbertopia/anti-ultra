document.addEventListener('DOMContentLoaded', function() {
    // Existing code for navbar toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
    });

    // Existing code for clock
    function updateClock() {
        const now = new Date();
        const second = now.getSeconds();
        const minute = now.getMinutes();
        const hour = now.getHours();

        const secondHand = document.querySelector('.second-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const hourHand = document.querySelector('.hour-hand');

        const secondDegrees = (second / 60) * 360 + 90;
        const minuteDegrees = (minute / 60) * 360 + (second / 60) * 6 + 90;
        const hourDegrees = (hour / 12) * 360 + (minute / 60) * 30 + 90;

        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call to set the clock immediately

    // New code for fetching and displaying IP address
    function getIPAddress() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('ip-display').textContent = `Your IP address is: ${data.ip}`;
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
                document.getElementById('ip-display').textContent = 'Unable to fetch IP address';
            });
    }

    getIPAddress();

    // Star field animation
let scene, camera, renderer, stars;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('stars-container').appendChild(renderer.domElement);

    stars = new THREE.Group();
    for(let i = 0; i < 1000; i++) {
        const star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        stars.add(star);
    }
    scene.add(stars);

    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    stars.children.forEach(star => {
        star.velocity += star.acceleration;
        star.y -= star.velocity;
        
        if (star.y < -300) {
            star.y = 300;
            star.velocity = 0;
        }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('DOMContentLoaded', function() {
    // Existing code (navbar toggle, clock update, IP address fetch)

    // Initialize and animate star field
    init();
    animate();
});