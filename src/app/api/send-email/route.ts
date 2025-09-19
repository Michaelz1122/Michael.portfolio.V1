import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, adBudget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Test the transporter connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection failed:', verifyError);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: 'Michaelzahy1@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Contact Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          ${service || adBudget ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Service Details:</h3>
            ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
            ${adBudget ? `<p><strong>Budget Range:</strong> ${adBudget}</p>` : ''}
          </div>
          ` : ''}

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
            <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>This email was sent from the contact form on Michael Zahy's website.</p>
            <p>Submitted on: ${new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Thank you for contacting Michael Zahy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #3b82f6; text-align: center;">Thank You for Contacting Me!</h2>
          
          <div style="margin: 20px 0;">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to me regarding my media buying and performance marketing services. I have received your message and will get back to you within 24 hours.</p>
            
            ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
            ${adBudget ? `<p><strong>Budget Range:</strong> ${adBudget}</p>` : ''}
            
            <p>Here's a copy of your message:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 15px 0;">
              <em>${message}</em>
            </div>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555;">What's Next?</h3>
            <ul style="line-height: 1.6;">
              <li>I will review your inquiry and prepare a personalized response</li>
              <li>Expect to hear from me via email or phone call within 24 hours</li>
              <li>We can schedule a consultation to discuss your specific needs</li>
            </ul>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555;">Get in Touch Directly</h3>
            <p>If you need immediate assistance, feel free to contact me:</p>
            <ul style="line-height: 1.6;">
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/201069720311">+20 1069720311</a></li>
              <li><strong>Email:</strong> Michaelzahy1@gmail.com</li>
              <li><strong>Facebook:</strong> <a href="https://www.facebook.com/MichaelZahy1">facebook.com/MichaelZahy1</a></li>
            </ul>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
            <p>Best regards,<br><strong>Michael Zahy</strong><br>Media Buyer & Performance Marketing Specialist</p>
            <p>© 2024 Michael Zahy. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send confirmation email
    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}