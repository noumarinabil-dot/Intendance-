# 📦 إعداد GitHub و Vercel

دليل كامل لنشر SGX-Intendance على GitHub ونشره على Vercel.

## 📋 الملفات الجاهزة

جميع الملفات الضرورية تم إنشاؤها مسبقاً:

- ✅ `.gitignore` - الملفات المتجاهلة
- ✅ `.env.example` - قالب متغيرات البيئة
- ✅ `vercel.json` - إعدادات Vercel
- ✅ `README_GITHUB.md` - ملف README لـ GitHub
- ✅ `LICENSE` - ترخيص MIT
- ✅ `CONTRIBUTING.md` - دليل المساهمة
- ✅ `.github/workflows/ci.yml` - CI/CD
- ✅ سكريبتات النشر
- ✅ توثيق كامل

## 🚀 الخطوة 1: إنشاء مستودع GitHub

### 1.1 إنشاء المستودع على GitHub

1. اذهب إلى [github.com](https://github.com)
2. انقر على "New repository"
3. املأ البيانات:
   - **اسم المستودع** : `sgx-intendance`
   - **الوصف** : "تطبيق لإدارة صيانة المواقع والمعدات"
   - **الرؤية** : عام أو خاص (حسب اختيارك)
   - ⚠️ **لا** تفعّل "Initialize with README" (لدينا الملفات بالفعل)
4. انقر على "Create repository"

## 🔧 الخطوة 2: تهيئة Git والرفع

### 2.1 تهيئة Git (إذا لم يكن معداً)

```bash
cd sgx-intendance
git init
```

### 2.2 إعداد Git (لأول مرة فقط)

```bash
git config --global user.name "اسمك"
git config --global user.email "your.email@example.com"
```

### 2.3 إضافة جميع الملفات

```bash
# التحقق من الملفات التي ستتم إضافتها
git status

# إضافة جميع الملفات
git add .

# التحقق من عدم إضافة ملفات حساسة
git status

# مهم جداً: تأكد أن .env ليس في القائمة
```

### 2.4 إنشاء أول commit

```bash
git commit -m "Initial commit - SGX-Intendance v1.0.0

- تطبيق كامل لإدارة الصيانة
- إدارة المواقع والمعدات والتدخلات
- التخطيط مع دعم داخلي/خارجي
- واجهة بالفرنسية
- توثيق كامل
- جاهز للنشر على Vercel"
```

### 2.5 الربط بمستودع GitHub

استبدل `اسم-المستخدم` باسم مستخدمك على GitHub:

```bash
git remote add origin https://github.com/اسم-المستخدم/sgx-intendance.git
```

### 2.6 الرفع إلى GitHub

```bash
# إعادة تسمية الفرع إلى 'main'
git branch -M main

# الرفع إلى GitHub
git push -u origin main
```

إذا واجهت خطأ في المصادقة:
- استخدم Personal Access Token (PAT)
- أو اضبط SSH

## 🌐 الخطوة 3: النشر على Vercel

### الخيار أ: عبر واجهة Vercel (موصى به)

1. **إنشاء قاعدة بيانات**

   **Neon (موصى به - مجاني):**
   - اذهب إلى [neon.tech](https://neon.tech)
   - أنشئ حساب
   - مشروع جديد: "sgx-intendance"
   - المنطقة: أوروبا
   - انسخ `DATABASE_URL`

   **أو Vercel Postgres:**
   - على Vercel > Storage > Create Database
   - النوع: Postgres
   - الاسم: sgx-intendance-db
   - انسخ `DATABASE_URL`

2. **النشر على Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - "Add New..." > "Project"
   - "Import Git Repository"
   - اختر `sgx-intendance`
   - Framework: Next.js (يتم الكشف تلقائياً)
   - **متغيرات البيئة**:
     - الاسم: `DATABASE_URL`
     - القيمة: رابط قاعدة البيانات
   - انقر "Deploy"

3. **تهيئة قاعدة البيانات**
   ```bash
   # تثبيت Vercel CLI
   npm i -g vercel
   
   # تسجيل الدخول
   vercel login
   
   # ربط المشروع
   vercel link
   
   # تحميل متغيرات البيئة
   vercel env pull .env.production
   
   # تطبيق المخطط
   npx drizzle-kit push
   ```

### الخيار ب: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر (اتبع التعليمات)
vercel

# الأسئلة التي ستُطرح:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? sgx-intendance
# - Directory? ./
# - Override settings? No

# إضافة DATABASE_URL
vercel env add DATABASE_URL production

# إعادة النشر
vercel --prod
```

## 📊 الخطوة 4: التحقق من النشر

1. **اختبار التطبيق**
   - افتح رابط Vercel
   - تحقق من ظهور الصفحة الرئيسية
   - اختبر `/api/health`

2. **إنشاء بيانات تجريبية**
   - أنشئ موقع
   - أضف معدة
   - خطط لتدخل

3. **التحقق من جميع الصفحات**
   - لوحة القيادة
   - التخطيط
   - التدخلات
   - المعدات
   - المواقع

## 🔄 الخطوة 5: سير عمل التطوير

### إجراء تعديلات

```bash
# 1. إنشاء فرع للميزة الجديدة
git checkout -b feature/ميزة-جديدة

# 2. إجراء التعديلات في الكود

# 3. الاختبار محلياً
npm run dev
npm run typecheck
npm run build

# 4. الـ commit
git add .
git commit -m "feat: وصف الميزة"

# 5. الرفع إلى GitHub
git push origin feature/ميزة-جديدة

# 6. على GitHub: إنشاء Pull Request

# 7. بعد الدمج: Vercel ينشر تلقائياً!
```

### النشر التلقائي

ينشر Vercel تلقائياً:
- ✅ كل push على `main` → الإنتاج
- ✅ كل Pull Request → معاينة
- ✅ كل فرع → معاينة فريدة

## 🛡️ الخطوة 6: الأمان

### متغيرات البيئة

⚠️ **مهم جداً**: لا تقم أبداً بعمل commit لـ `.env`!

الـ `.gitignore` معد لتجاهل:
- `.env`
- `.env.local`
- `.env*.local`

## ✅ قائمة التحقق النهائية

قبل النشر:

- [ ] `.env` غير موجود في الـ commit
- [ ] `README.md` محدّث
- [ ] متغيرات البيئة معدة على Vercel
- [ ] قاعدة البيانات منشأة والمخطط مطبق
- [ ] التطبيق مختبر على Vercel
- [ ] التوثيق كامل
- [ ] الترخيص مضاف
- [ ] CI/CD يعمل
- [ ] جميع الصفحات متاحة
- [ ] بيانات تجريبية منشأة

## 🎯 أوامر مرجعية سريعة

```bash
# Git
git status                              # رؤية الحالة
git add .                               # إضافة جميع الملفات
git commit -m "رسالة"                  # Commit
git push                                # الرفع إلى GitHub
git pull                                # جلب التغييرات

# Vercel
vercel                                  # النشر
vercel --prod                           # النشر للإنتاج
vercel env ls                           # سرد متغيرات البيئة
vercel logs                             # رؤية السجلات
vercel domains                          # إدارة النطاقات

# قاعدة البيانات
npm run db:push                         # تطبيق المخطط
npm run db:studio                       # واجهة رسومية

# البناء
npm run dev                             # التطوير
npm run build                           # البناء
npm run typecheck                       # فحص TypeScript
```

## 🆘 المشاكل الشائعة

### رفض Git push

```bash
# فرض الرفع (تحذير: فقط إذا كنت متأكداً)
git push -f origin main
```

### خطأ Vercel "Build failed"

1. تحقق من السجلات على Vercel
2. اختبر البناء محلياً: `npm run build`
3. تحقق من تعريف DATABASE_URL

### جداول مفقودة

```bash
# تطبيق المخطط
vercel env pull .env.production
npx drizzle-kit push
```

## 📚 الموارد

- [توثيق Git](https://git-scm.com/doc)
- [توثيق GitHub](https://docs.github.com)
- [توثيق Vercel](https://vercel.com/docs)
- [توثيق Next.js](https://nextjs.org/docs)

---

**تطبيقك جاهز الآن لـ GitHub و Vercel! 🎉**

لأي سؤال، افتح issue على GitHub.

## 📱 نصائح إضافية

### بعد النشر الأول

1. **اختبر جميع الميزات**
   - إنشاء مواقع
   - إضافة معدات
   - جدولة تدخلات
   - عرض التخطيط

2. **راقب الأداء**
   - استخدم Vercel Analytics
   - تحقق من أوقات الاستجابة
   - راقب الأخطاء في السجلات

3. **أنشئ نسخ احتياطية**
   - صدّر بيانات قاعدة البيانات بانتظام
   - احفظ نسخة من المتغيرات البيئية

**بالتوفيق في مشروعك! 🌟**
