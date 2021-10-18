const contactForm = document.querySelector('.contact__form');
const navbar = document.querySelector('.nav');
const navbarLinks = navbar.querySelectorAll('.nav__link--text');
const navButton = document.querySelector('.nav__button');

const darkColorVariable = getComputedStyle(document.body).getPropertyValue('--color-dark');
const lightColorVariable = getComputedStyle(document.body).getPropertyValue('--color-light');

navButton.addEventListener('click', () => {
	navbar.classList.toggle('nav--active');
	document.body.classList.toggle('nav--active');
});

navbarLinks.forEach((element) => {
	element.addEventListener('click', () => {
		navbar.classList.remove('nav--active');
		document.body.classList.remove('nav--active');
	});
});

emailjs.init('user_87ayOZuaHkRIAmLxIJtsH');

const emailSendCallback = (title, message, icon) => {
	Swal.fire({
		title: title,
		text: message,
		icon: icon,
		showConfirmButton: false,
		iconColor: icon === 'error' ? 'red' : 'green',
		toast: true,
		position: 'top-end',
		target: 'body',
		background: lightColorVariable,
		timer: 5000,
		customClass: {
			container: 'sweet-alert2-container',
		},
	});
};

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();

	emailjs.sendForm('service_2xx8ip8', 'template_tnkb1wy', e.target).then(
		// ON SUCCESS
		(response) =>
			emailSendCallback('Thanks!', 'Your message has been sent successfully...', 'success'),
		// ON ERROR
		(error) => emailSendCallback('Error!', 'Please try again later...', 'error')
	);

	e.target.reset();
});

const projectsBanner = document.querySelector('.projects__banner');

// Make elements full width ignoring scrollbar because 100vw includes it
const getFullWidth = (element) => {
	const scrollBarWidth = window.innerWidth - document.body.clientWidth;
	const fullWidth = window.innerWidth - scrollBarWidth;
	return fullWidth;
};

function checksDeviceWidth(mediaQueryRule) {
	if (mediaQueryRule.matches) {
		const sidebarWidthVariable = getComputedStyle(document.body).getPropertyValue(
			'--sidebar-width'
		);
		const sidebarWidthComputed = sidebarWidthVariable.replace(/[a-z]/gi, '') * 16;
		// If media query matches
		projectsBanner.style.width = `${getFullWidth() - sidebarWidthComputed}px`;
	} else {
		projectsBanner.style.width = `${getFullWidth()}px`;
	}
}

const mediaQueryRule = window.matchMedia('(min-width: 33rem)');

checksDeviceWidth(mediaQueryRule); // Call listener function at run time

window.addEventListener('resize', () => {
	checksDeviceWidth(mediaQueryRule);
});
