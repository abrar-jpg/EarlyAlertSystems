from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
import logging

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Use your SMTP server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'  # Your email
app.config['MAIL_PASSWORD'] = 'your_password'  # Your email password or app password
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'  # Default sender

mail = Mail(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Route for the main dashboard
@app.route('/')
def index():
    return render_template('index.html')

# Route for the analyze data page
@app.route('/analyze')
def analyze_data():
    # Example data for the pie chart and line chart
    pie_data = [40, 20, 15, 10, 15]
    pie_labels = ["Academic", "Financial", "Social", "Health", "Family"]
    line_data = {
        "labels": ["January", "February", "March", "April", "May"],
        "values": [20, 30, 40, 25, 35]
    }

    return render_template('analyze_data.html', pie_data=pie_data, pie_labels=pie_labels, line_data=line_data)

# Route for sending notifications
@app.route('/notifications', methods=['GET', 'POST'])
def send_notifications():
    if request.method == 'POST':
        student_name = request.form['student_name']
        student_email = request.form['student_email']
        notification_type = request.form['notification_type']
        notification_message = request.form['notification_message']

        # Create and send the email
        msg = Message(subject=f"Notification: {notification_type}",
                      recipients=[student_email])
        msg.body = f"Hello {student_name},\n\n{notification_message}\n\nBest regards,\nYour Team"

        try:
            mail.send(msg)
            flash("Notification sent successfully!", "success")
        except Exception as e:
            logging.error(f"Error sending email: {str(e)}")  # Log the error
            flash(f"An error occurred: {str(e)}", "danger")  # Provide detailed error message

        return redirect(url_for('send_notifications'))  # Redirect after POST to avoid form resubmission

    return render_template('send_notifications.html')

# Route for viewing reports
@app.route('/reports')
def view_reports():
    return render_template('view_reports.html')

if __name__ == '__main__':
    app.run(debug=True)
