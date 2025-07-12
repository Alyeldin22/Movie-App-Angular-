import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  public lang$ = this.currentLang.asObservable();

  private translations: Translation = {
    // Navigation
    'nav.movies': { en: 'Movies', ar: 'الأفلام' },
    'nav.tvShows': { en: 'TV Shows', ar: 'المسلسلات' },
    'nav.wishlist': { en: 'Wishlist', ar: 'المفضلة' },
    'nav.search': { en: 'Search movie...', ar: 'البحث عن فيلم...' },
    'nav.login': { en: 'Login', ar: 'تسجيل الدخول' },
    'nav.register': { en: 'Register', ar: 'إنشاء حساب' },
    'nav.logout': { en: 'Logout', ar: 'تسجيل الخروج' },
    'nav.welcome': { en: 'Welcome', ar: 'مرحباً' },

    // Auth Pages
    'auth.welcomeBack': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    'auth.signInContinue': { en: 'Sign in to your account to continue', ar: 'سجل دخولك للمتابعة' },
    'auth.createAccount': { en: 'Create Account', ar: 'إنشاء حساب' },
    'auth.joinJourney': { en: 'Join us to start your movie journey', ar: 'انضم إلينا لبدء رحلتك السينمائية' },
    'auth.resetPassword': { en: 'Reset Password', ar: 'إعادة تعيين كلمة المرور' },
    'auth.enterEmailReset': { en: 'Enter your email to receive a password reset link', ar: 'أدخل بريدك الإلكتروني لاستلام رابط إعادة تعيين كلمة المرور' },

    // Form Labels
    'form.fullName': { en: 'Full Name', ar: 'الاسم الكامل' },
    'form.email': { en: 'Email', ar: 'البريد الإلكتروني' },
    'form.password': { en: 'Password', ar: 'كلمة المرور' },
    'form.confirmPassword': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
    'form.emailAddress': { en: 'Email Address', ar: 'عنوان البريد الإلكتروني' },

    // Form Placeholders
    'placeholder.fullName': { en: 'Enter your full name', ar: 'أدخل اسمك الكامل' },
    'placeholder.email': { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
    'placeholder.password': { en: 'Enter your password', ar: 'أدخل كلمة المرور' },
    'placeholder.confirmPassword': { en: 'Confirm your password', ar: 'أكد كلمة المرور' },
    'placeholder.emailAddress': { en: 'Enter your email address', ar: 'أدخل عنوان بريدك الإلكتروني' },
    'placeholder.searchMovie': { en: 'Search movie...', ar: 'البحث عن فيلم...' },

    // Buttons
    'btn.signIn': { en: 'Sign In', ar: 'تسجيل الدخول' },
    'btn.createAccount': { en: 'Create Account', ar: 'إنشاء حساب' },
    'btn.sendResetLink': { en: 'Send Reset Link', ar: 'إرسال رابط إعادة التعيين' },
    'btn.viewDetails': { en: 'View Details', ar: 'عرض التفاصيل' },
    'btn.prev': { en: 'Previous', ar: 'السابق' },
    'btn.next': { en: 'Next', ar: 'التالي' },
    'btn.sendAnotherEmail': { en: 'Send Another Email', ar: 'إرسال بريد آخر' },
    'btn.backToLogin': { en: 'Back to Login', ar: 'العودة لتسجيل الدخول' },

    // Social Login
    'social.or': { en: 'or', ar: 'أو' },
    'social.google': { en: 'Continue with Google', ar: 'المتابعة مع جوجل' },
    'social.facebook': { en: 'Continue with Facebook', ar: 'المتابعة مع فيسبوك' },

    // Links
    'link.forgotPassword': { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟' },
    'link.signUp': { en: 'Sign Up', ar: 'إنشاء حساب' },
    'link.signIn': { en: 'Sign In', ar: 'تسجيل الدخول' },
    'link.rememberPassword': { en: 'Remember your password?', ar: 'تذكرت كلمة المرور؟' },

    // Messages
    'msg.checkEmail': { en: 'Check Your Email', ar: 'تحقق من بريدك الإلكتروني' },
    'msg.emailSent': { en: 'We\'ve sent a password reset link to', ar: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى' },
    'msg.checkSpam': { en: 'If you don\'t see the email, check your spam folder.', ar: 'إذا لم تجد البريد، تحقق من مجلد الرسائل غير المرغوب فيها.' },
    'msg.dontHaveAccount': { en: 'Don\'t have an account?', ar: 'ليس لديك حساب؟' },
    'msg.alreadyHaveAccount': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },

    // Movies
    'movies.nowPlaying': { en: 'Now Playing Movies', ar: 'الأفلام المعروضة حالياً' },
    'movies.discover': { en: 'Discover the latest movies in theaters', ar: 'اكتشف أحدث الأفلام في دور السينما' },
    'movies.page': { en: 'Page', ar: 'الصفحة' },
    'movies.of': { en: 'of', ar: 'من' },

    // TV Shows
    'tv.popular': { en: 'Popular TV Shows', ar: 'المسلسلات الشائعة' },
    'tv.discover': { en: 'Discover the most popular TV shows', ar: 'اكتشف أشهر المسلسلات التلفزيونية' },
    'tv.page': { en: 'Page', ar: 'الصفحة' },
    'tv.of': { en: 'of', ar: 'من' },

    // Errors
    'error.fillAllFields': { en: 'Please fill in all fields', ar: 'يرجى ملء جميع الحقول' },
    'error.passwordsNotMatch': { en: 'Passwords do not match', ar: 'كلمات المرور غير متطابقة' },
    'error.passwordLength': { en: 'Password must be at least 6 characters long', ar: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل' },
    'error.validEmail': { en: 'Please enter a valid email address', ar: 'يرجى إدخال عنوان بريد إلكتروني صحيح' },
    'error.userNotFound': { en: 'User not found. Please check your email or register a new account.', ar: 'المستخدم غير موجود. يرجى التحقق من بريدك الإلكتروني أو إنشاء حساب جديد.' },
    'error.invalidPassword': { en: 'Invalid password. Please try again.', ar: 'كلمة مرور غير صحيحة. يرجى المحاولة مرة أخرى.' },
    'error.loginFailed': { en: 'Login failed. Please try again.', ar: 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.' },
    'error.registrationFailed': { en: 'Registration failed. Please try again.', ar: 'فشل التسجيل. يرجى المحاولة مرة أخرى.' },
    'error.general': { en: 'An error occurred. Please try again.', ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.' },

    // Success
    'success.login': { en: 'Login successful!', ar: 'تم تسجيل الدخول بنجاح!' },
    'success.registration': { en: 'Registration successful!', ar: 'تم التسجيل بنجاح!' },
    'success.googleLogin': { en: 'Google login successful!', ar: 'تم تسجيل الدخول بجوجل بنجاح!' },
    'success.facebookLogin': { en: 'Facebook login successful!', ar: 'تم تسجيل الدخول بفيسبوك بنجاح!' },
    'success.emailSent': { en: 'If this email exists in our system, a password reset link has been sent.', ar: 'إذا كان هذا البريد موجوداً في نظامنا، تم إرسال رابط إعادة تعيين كلمة المرور.' },

    // Language Names
    'lang.english': { en: 'English', ar: 'English' },
    'lang.arabic': { en: 'العربية', ar: 'العربية' }
  };

  constructor() {
    // Set initial language from localStorage or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLang(savedLang);
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'ar') {
      this.currentLang.next(lang);
      localStorage.setItem('language', lang);
      
      // Set document direction for RTL support
      document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }

  getLang(): string {
    return this.currentLang.value;
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (translation) {
      const currentLang = this.currentLang.value as 'en' | 'ar';
      return translation[currentLang] || translation['en'] || key;
    }
    return key;
  }

  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ];
  }
}

