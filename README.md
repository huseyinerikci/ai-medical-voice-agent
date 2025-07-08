# AI Medical Voice Agent

AI Medical Voice Agent, yapay zeka destekli sesli tıbbi danışmanlık ve raporlama platformudur. Kullanıcılar, AI doktorlarla sesli görüşme yapabilir, anında medikal rapor alabilir ve geçmiş danışma kayıtlarına erişebilir.

## Önizleme

![ai-medical-voice-agent](public/ai-medical-voice-agent.gif)

## Özellikler

- **Sesli AI Doktor Görüşmesi:** Farklı uzmanlık alanlarında AI doktorlarla gerçek zamanlı sesli görüşme.
- **Anında Medikal Rapor:** Görüşme sonunda OpenAI ile otomatik, yapılandırılmış medikal rapor.
- **Doktor Önerisi:** Kullanıcının notlarına/simptomlarına göre en uygun AI doktor önerisi.
- **Kullanıcı Paneli:** Geçmiş danışma ve raporların listelenmesi, profil yönetimi.
- **Premium & Ücretsiz Kullanım:** Sınırlı ücretsiz, sınırsız premium danışma.
- **Güvenli Kimlik Doğrulama:** Clerk ile modern auth.
- **Modern UI:** Next.js 15, Tailwind CSS, shadcn/ui ile responsive ve şık arayüz.

## Teknolojiler

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **OpenAI API**
- **Vapi AI (Voice API)**
- **Clerk (Auth)**
- **Drizzle ORM + NeonDB (PostgreSQL)**

## Kurulum

1. **Projeyi klonla:**
   ```sh
   git clone <repo-url>
   cd ai-medical-voice-agent
   ```
2. **Bağımlılıkları yükle:**
   ```sh
   npm install
   ```
3. **.env dosyasını oluştur:**
   - 
     ```env

     DATABASE_URL=
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=
     NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
     NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
     OPEN_ROUTER_API_KEY=
     NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=
     NEXT_PUBLIC_API_KEY=
     ```
4. **Veritabanı migrasyonları:**
   ```sh
   npx drizzle-kit push:pg
   ```
5. **Geliştirme sunucusunu başlat:**
   ```sh
   npm run dev
   ```
   Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışır.

## Kullanım

- Giriş yap veya kayıt ol.
- "Start a Consultation" ile AI doktor önerisi al ve sesli görüşme başlat.
- Görüşme sonunda anında medikal rapor oluşturulur.
- Geçmiş danışma ve raporlarına dashboard'dan eriş.
