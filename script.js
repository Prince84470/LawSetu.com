// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const loginForms = document.querySelectorAll('.login-form');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and forms
      tabButtons.forEach(btn => btn.classList.remove('active'));
      loginForms.forEach(form => form.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show corresponding form
      const tabName = this.getAttribute('data-tab');
      document.getElementById(tabName + 'LoginForm').classList.add('active');
    });
  });
});