import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Pilates Base",
  description:
    "Pilates Baseのプライバシーポリシーについてご説明します。個人情報の取り扱い、Cookieの使用、Google Analyticsによるアクセス解析について記載しています。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-3xl font-bold text-rose-300 hover:text-rose-400 transition-colors"
          >
            全国のピラティス教室
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-stone-800">
          プライバシーポリシー
        </h1>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <p>
            Pilates
            Base（以下「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>

          {/* 個人情報の収集について */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              1. 個人情報の収集について
            </h2>
            <p className="mt-2">
              当サイトでは、お問い合わせの際に、お名前・メールアドレス等の個人情報をご提供いただく場合があります。これらの情報は、お問い合わせへの対応およびサービス改善の目的でのみ収集いたします。
            </p>
          </section>

          {/* 利用目的 */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              2. 利用目的
            </h2>
            <p className="mt-2">
              当サイトが収集した個人情報は、以下の目的で利用いたします。
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>お問い合わせへの回答・対応</li>
              <li>サービスの運営・改善</li>
              <li>当サイトに関する重要なお知らせの送付</li>
            </ul>
          </section>

          {/* 第三者への提供 */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              3. 第三者への提供
            </h2>
            <p className="mt-2">
              当サイトは、以下の場合を除き、収集した個人情報を第三者に提供することはありません。
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>ご本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命・身体または財産の保護のために必要がある場合</li>
            </ul>
          </section>

          {/* Cookieの使用について */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              4. Cookieの使用について
            </h2>
            <p className="mt-2">
              当サイトでは、ユーザーの利便性向上やアクセス状況の分析のためにCookieを使用しています。Cookieとは、ウェブサイトからユーザーのブラウザに送信される小さなデータファイルで、ブラウザに保存されます。
            </p>
            <p className="mt-2">
              ユーザーはブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、当サイトの一部機能が利用できなくなる場合があります。
            </p>
          </section>

          {/* アクセス解析ツール（Google Analytics）について */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              5. アクセス解析ツール（Google Analytics）について
            </h2>
            <p className="mt-2">
              当サイトでは、Googleが提供するアクセス解析ツール「Google
              Analytics」を使用しています。Google
              Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p className="mt-2">
              この機能はCookieを無効にすることで収集を拒否できますので、お使いのブラウザの設定をご確認ください。また、Googleが提供する
              <a
                href="https://tools.google.com/dlpage/gaoptout?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 underline hover:text-rose-500"
              >
                Google Analyticsオプトアウトアドオン
              </a>
              をインストールすることで、Google
              Analyticsによるデータ収集を無効にすることも可能です。
            </p>
            <p className="mt-2">
              Google Analyticsの利用規約については
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 underline hover:text-rose-500"
              >
                Google Analytics利用規約
              </a>
              を、Googleのプライバシーポリシーについては
              <a
                href="https://policies.google.com/privacy?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 underline hover:text-rose-500"
              >
                Googleプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          {/* お問い合わせ */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              6. お問い合わせ
            </h2>
            <p className="mt-2">
              本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          {/* 制定日 */}
          <p className="text-sm text-stone-500">制定日: 2026年2月15日</p>
        </div>
      </main>
    </div>
  );
}
