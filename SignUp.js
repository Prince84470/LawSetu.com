// Sign Up Page JavaScript
function showStep(stepName) {
  const steps = document.querySelectorAll('.form-step');
  steps.forEach(step => step.classList.remove('active'));
  document.getElementById('step-' + stepName).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  
  // Variables
  let currentUserType = '';
  let userEmail = '';
  let sentOTP = '';

  // EmailJS initialization (replace with your public key)
  emailjs.init('YOUR_PUBLIC_KEY');

  // Email Form Submission
  const emailForm = document.getElementById('emailForm');
  emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value)) {
      userEmail = emailInput.value;
      // Generate OTP
      sentOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      // HTML template for email
      const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification OTP</title>
    <style>
        body.light {
            --bg: #FAFAFA;
            --card: #ffffff;
            --primary: #111111;
            --accent: #D4AF37;
            --text: #1F2937;
            --shadow: rgba(0,0,0,.08);
        }
        body {
            font-family: Arial, sans-serif;
            background-color: var(--bg);
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: var(--card);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px var(--shadow);
        }
        h1 {
            color: var(--primary);
            text-align: center;
        }
        p {
            color: var(--text);
            line-height: 1.6;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent);
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            background-color: var(--bg);
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: var(--text);
            font-size: 12px;
        }
    </style>
</head>
<body class="light">
    <div class="container">
        <h1>Email Verification</h1>
        <p>Thank you for signing up! To complete your registration, please verify your email address using the OTP code below.</p>
        <div class="otp-code">${sentOTP}</div>
        <p>This code will expire in 10 minutes. If you did not request this verification, please ignore this email.</p>
        <div class="footer">
            <p>&copy; 2023 LawSetu. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
      
      // Send email
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: userEmail,
        message: emailTemplate,
        subject: 'Your OTP for LawSetu Verification'
      }).then(function(response) {
        console.log('Email sent successfully', response);
        document.getElementById('displayEmail').textContent = userEmail;
        showStep('otp');
      }, function(error) {
        console.log('Failed to send email', error);
        alert('Failed to send OTP. Please try again.');
      });
    } else {
      alert('Please enter a valid email address');
    }
  });

  // OTP Input Auto-navigation
  const otpInputs = document.querySelectorAll('.otp-input');
  
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function(e) {
      // Only allow numbers
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Move to next input
      if (this.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    
    input.addEventListener('keydown', function(e) {
      // Handle backspace
      if (e.key === 'Backspace' && this.value === '' && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
    
    input.addEventListener('paste', function(e) {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text');
      const numbers = pasteData.replace(/[^0-9]/g, '').split('');
      
      numbers.forEach((num, i) => {
        if (i < otpInputs.length) {
          otpInputs[i].value = num;
        }
      });
      
      // Focus last filled input
      if (numbers.length > 0 && numbers.length <= otpInputs.length) {
        otpInputs[Math.min(numbers.length, otpInputs.length - 1)].focus();
      }
    });
  });

  // OTP Form Submission
  const otpForm = document.getElementById('otpForm');
  otpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get OTP value
    let otp = '';
    otpInputs.forEach(input => {
      otp += input.value;
    });
    
    if (otp === sentOTP) {
      // After OTP verified, show user type selection
      showStep('usertype');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  });
});