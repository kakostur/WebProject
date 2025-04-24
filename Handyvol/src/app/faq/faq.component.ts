import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent], 
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: 'What is Handyvol and how does it work?',
      answer: 'Handyvol is a platform that connects volunteers with community-based organizations. By signing up, users can browse ongoing events, register for volunteering opportunities, and make a real impact in their local area.'
    },
    {
      question: 'How do I register as a volunteer?',
      answer: 'Click on the "Sign Up" button on the homepage, fill in your personal details, and confirm your email. Once registered, you can explore volunteering opportunities and apply for events with just a few clicks.'
    },
    {
      question: 'Can organizations also register on Handyvol?',
      answer: 'Absolutely. Organizations can create an account to post volunteering events, manage applications, communicate with volunteers, and track participation analytics through a dedicated organizer panel.'
    },
    {
      question: 'Is Handyvol free to use?',
      answer: 'Yes, Handyvol is completely free for both volunteers and organizations. Our mission is to foster community engagement and make volunteering accessible to everyone.'
    },
    {
      question: 'Can I volunteer if I have a full-time job?',
      answer: 'Of course! Most events are flexible and offer weekend or short-duration tasks. You can filter opportunities by date and time to find ones that fit your schedule.'
    },
    {
      question: 'Do I receive a certificate for volunteering?',
      answer: 'Yes, many organizers issue digital certificates after event completion. These certificates can be downloaded and added to your resume or shared on professional platforms like LinkedIn.'
    },
    {
      question: 'How do I cancel or withdraw from an event I joined?',
      answer: 'Go to your profile, navigate to "My Events", and click the "Cancel" button next to the event. Please try to cancel at least 24 hours before the event begins.'
    },
    {
      question: 'How do I contact the event organizer?',
      answer: 'Each event page contains contact details of the organizer. You can reach out via email or phone provided, or use the built-in messaging feature inside your Handyvol dashboard.'
    },
    {
      question: 'Is there a mobile app for Handyvol?',
      answer: 'We are currently developing the Handyvol mobile app for both iOS and Android. In the meantime, the website is fully mobile-responsive and works great on all devices.'
    },
    {
      question: 'Can I suggest a new volunteering opportunity or event?',
      answer: 'Yes, we welcome your ideas! Contact us through the feedback form or email us directly. We’ll review your suggestion and connect with local partners if applicable.'
    }
  ];

  activeQuestion: number | null = null;

  toggleAnswer(index: number) {
    this.activeQuestion = this.activeQuestion === index ? null : index;
  }
}

