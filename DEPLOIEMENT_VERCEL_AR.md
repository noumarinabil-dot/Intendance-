# دليل النشر على Vercel

## 📋 المتطلبات الأساسية

1. حساب GitHub
2. حساب Vercel (مجاني على [vercel.com](https://vercel.com))
3. قاعدة بيانات PostgreSQL (Neon أو Supabase أو Vercel Postgres)

## 🚀 خطوات النشر

### 1. تحضير قاعدة البيانات

#### الخيار أ: Vercel Postgres (موصى به)

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول إلى حسابك
3. اذهب إلى تبويب "Storage"
4. انقر على "Create Database"
5. اختر "Postgres"
6. اختر منطقتك (أوروبا يفضل)
7. سمّي قاعدة البيانات: `sgx-intendance-db`
8. انسخ `DATABASE_URL` المقدم

#### الخيار ب: Neon (مجاني وبسيط)

1. اذهب إلى [neon.tech](https://neon.tech)
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. سمّه: `sgx-intendance`
5. اختر منطقة أوروبا
6. انسخ سلسلة الاتصال (Connection String)
7. الصيغة: `postgresql://user:password@ep-xxxxx.eu-central-1.aws.neon.tech/dbname?sslmode=require`

#### الخيار ج: Supabase (مجاني)

1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. سمّه: `sgx-intendance`
5. اختر كلمة مرور آمنة
6. اختر منطقة أوروبا
7. في Settings > Database، انسخ "Connection string" بوضع "URI"

### 2. رفع الكود إلى GitHub

```bash
# تهيئة Git (إذا لم يكن معداً بعد)
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit - SGX-Intendance"

# أنشئ مستودع جديد على GitHub
# ثم اربطه بمشروعك المحلي
git remote add origin https://github.com/اسم-المستخدم-الخاص-بك/sgx-intendance.git

# ادفع الكود
git branch -M main
git push -u origin main
```

### 3. النشر على Vercel

#### عبر الواجهة الويب (موصى به)

1. اذهب إلى [vercel.com](https://vercel.com)
2. انقر على "Add New..." > "Project"
3. استورد مستودع GitHub الخاص بك `sgx-intendance`
4. سيكتشف Vercel تلقائياً Next.js
5. **إعدادات مهمة** :
   - **Root Directory** : اتركه فارغاً أو ضع `./` (ليس `src/`)
   - **Framework Preset** : Next.js (يتم اكتشافه تلقائياً)
   - **Build Command** : اتركه فارغاً
6. اضبط متغيرات البيئة:
   - انقر على "Environment Variables"
   - أضف: `DATABASE_URL` = سلسلة الاتصال الخاصة بك
7. انقر على "Deploy"

⚠️ **مهم** : بنيتنا هي `src/app/` لذا يجب أن يبقى Root Directory فارغاً!

#### عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# اتبع التعليمات
# اربط المشروع بمستودع GitHub الخاص بك
# أضف متغير البيئة DATABASE_URL
```

### 4. تهيئة قاعدة البيانات

بعد نجاح النشر:

#### الخيار 1: عبر Terminal في Vercel

```bash
vercel env pull .env.production
npm run build
npx drizzle-kit push
```

#### الخيار 2: تطبيق المخطط يدوياً

اتصل بقاعدة بيانات PostgreSQL الخاصة بك وقم بتنفيذ:

```bash
# سيتم إنشاء المخطط تلقائياً عند أول نشر
# إذا لزم الأمر، يمكنك تنفيذ drizzle-kit push محلياً باستخدام DATABASE_URL الإنتاجي
npx drizzle-kit push
```

### 5. التحقق من النشر

1. افتح الرابط المقدم من Vercel (مثال: `sgx-intendance.vercel.app`)
2. تحقق من ظهور الصفحة الرئيسية
3. اختبر API: `https://your-app.vercel.app/api/health`
4. أنشئ موقع، معدة، تدخل للاختبار

### 6. إعداد نطاق مخصص (اختياري)

إذا كان لديك اسم نطاق:

1. في Vercel، اذهب إلى "Settings" > "Domains"
2. أضف نطاقك المخصص
3. اضبط DNS حسب تعليمات Vercel

## 🔧 إعداد متغيرات البيئة

في Vercel، أضف هذه المتغيرات:

| المتغير | القيمة | الوصف |
|----------|--------|-------------|
| `DATABASE_URL` | `postgresql://...` | سلسلة اتصال PostgreSQL |

## 📊 أوامر مفيدة

```bash
# توليد أنواع TypeScript للمسارات
npm run typegen

# التحقق من أنواع TypeScript
npm run typecheck

# بناء الإنتاج محلياً
npm run build

# بدء الإنتاج محلياً
npm start

# دفع المخطط إلى قاعدة البيانات
npx drizzle-kit push

# فتح Drizzle Studio (واجهة رسومية لقاعدة البيانات)
npx drizzle-kit studio
```

## 🔄 النشر التلقائي

ينشر Vercel تلقائياً عند كل push على فرع `main`:

```bash
# إجراء التعديلات
git add .
git commit -m "وصف التغييرات"
git push

# Vercel ينشر تلقائياً!
```

## 🐛 حل المشاكل

### خطأ في الاتصال بقاعدة البيانات

- تحقق من أن `DATABASE_URL` معدة بشكل صحيح في Vercel
- تأكد من أن الرابط يحتوي على `?sslmode=require` لـ Neon
- تحقق من أن عنوان IP الخاص بك مصرح به

### خطأ في البناء

```bash
# اختبر البناء محلياً
npm run build

# إذا كان يعمل محلياً، تحقق من سجلات Vercel
vercel logs
```

### جداول مفقودة

```bash
# اتصل بقاعدة البيانات وطبق المخطط
npx drizzle-kit push
```

## 📝 أوامر Git المفيدة

```bash
# التحقق من الحالة
git status

# رؤية التعديلات
git diff

# إضافة جميع الملفات المعدلة
git add .

# Commit مع رسالة
git commit -m "رسالتك"

# الدفع إلى GitHub
git push

# رؤية السجل
git log

# إنشاء فرع جديد
git checkout -b اسم-الفرع

# دمج فرع
git checkout main
git merge اسم-الفرع
```

## 🎯 قائمة التحقق قبل النشر

- [ ] قاعدة بيانات PostgreSQL منشأة
- [ ] `DATABASE_URL` منسوخة
- [ ] الكود مدفوع إلى GitHub
- [ ] المشروع منشأ على Vercel
- [ ] متغير البيئة `DATABASE_URL` معد
- [ ] النشر ناجح
- [ ] مخطط قاعدة البيانات مطبق
- [ ] التطبيق مختبر ويعمل

## 🌟 أفضل الممارسات

1. **لا تقم أبداً بعمل commit لـ `.env`** - استخدم `.env.example` كنموذج
2. **استخدم الفروع** للميزات الجديدة
3. **اختبر محلياً** قبل الدفع
4. **احفظ نسخة احتياطية من قاعدة البيانات** بانتظام
5. **راقب سجلات** Vercel لاكتشاف الأخطاء

## 📞 الدعم

- [وثائق Vercel](https://vercel.com/docs)
- [وثائق Next.js](https://nextjs.org/docs)
- [وثائق Drizzle ORM](https://orm.drizzle.team)
- [وثائق Neon](https://neon.tech/docs/introduction)

---

**تطبيق SGX-Intendance الخاص بك جاهز الآن لـ Vercel!** 🚀

## 📱 ملاحظات إضافية

### إنشاء بيانات تجريبية

بعد النشر الأول، يمكنك إنشاء بيانات تجريبية:

1. افتح المتصفح واذهب إلى تطبيقك
2. أنشئ مواقع، معدات، وتدخلات يدوياً
3. أو استخدم الأوامر SQL المقدمة في الملفات لإنشاء بيانات تجريبية

### التحديثات المستقبلية

لتحديث التطبيق:

```bash
# قم بالتعديلات في الكود
# ثم:
git add .
git commit -m "وصف التحديث"
git push

# سينشر Vercel التحديث تلقائياً
```

### نصائح الأداء

1. استخدم CDN Vercel للملفات الثابتة
2. راقب أوقات الاستجابة في لوحة تحكم Vercel
3. استخدم Vercel Analytics لمتابعة الأداء
4. قم بتحسين الصور باستخدام Next.js Image

**بالتوفيق في نشر تطبيقك! 🎉**
