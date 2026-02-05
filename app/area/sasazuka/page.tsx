import Link from "next/link";
import { pilatesStudios } from "@/app/data/studios";

export default function SasazukaStationPage() {
  // Filter studios for Sasazuka area
  const sasazukaStudios = pilatesStudios.filter(
    (studio) => studio.name.includes("笹塚") || studio.address.includes("笹塚"),
  );

  const areaName = "笹塚";

  return (
    <div
      style={{
        fontFamily:
          "'Hiragino Kaku Gothic ProN', 'メイリオ', 'Noto Sans JP', sans-serif",
        lineHeight: "1.8",
        color: "#4a4a4a",
        backgroundColor: "#faf8f5",
        margin: 0,
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            color: "#d4a5a5",
            fontSize: "32px",
            marginTop: "50px",
            marginBottom: "25px",
            paddingBottom: "12px",
            borderBottom: "2px solid #f0e4d7",
          }}
        >
          {areaName}のピラティススタジオおすすめランキング
        </h1>
        <div
          style={{
            fontSize: "16px",
            color: "#666",
            lineHeight: "1.9",
            backgroundColor: "#fef9f3",
            padding: "25px",
            borderLeft: "4px solid #e5c4c4",
            marginBottom: "40px",
          }}
        >
          <p>
            {areaName}
            でピラティススタジオを探しているけれど、どこを選べばいいか迷っていませんか。
          </p>

          <p>
            近年、健康志向の高まりとともにピラティスの人気が急上昇しています。
          </p>

          <p>
            インナーマッスルを鍛えて姿勢を改善したい方、ダイエットを目指す方など、さまざまな目的で多くの人がスタジオに通い始めました。
          </p>

          <p>
            しかし、{areaName}
            には数多くのスタジオがあり、料金プランやレッスン形式も異なるため、自分に合った場所を見つけるのは簡単ではありません。
          </p>

          <p>
            この記事では、{areaName}
            でおすすめのピラティススタジオを厳選してご紹介するとともに、選び方のポイントや料金相場もお答えしていきます。
          </p>
        </div>

        <h2
          style={{
            color: "#d4a5a5",
            fontSize: "28px",
            marginTop: "50px",
            marginBottom: "25px",
            paddingBottom: "12px",
            borderBottom: "2px solid #f0e4d7",
          }}
        >
          {areaName}のピラティスジムおすすめ{sasazukaStudios.length}選
        </h2>
        <p>
          {areaName}
          には、初心者から経験者まで幅広く対応できるピラティススタジオが数多く存在しています。
        </p>

        <p>
          マシンピラティスを中心としたスタジオや、マットとマシンの両方を選べる施設、グループレッスンとプライベートレッスンを自由に組み合わせられるスタジオなど、それぞれに特色があります。
        </p>

        <p>
          ここでは、通いやすさ、料金、設備の充実度、インストラクターの質などを総合的に評価し、
          {areaName}
          で特におすすめできるピラティススタジオを厳選して紹介していきましょう。
        </p>

        <p>
          体験レッスンの有無や通い放題プランの設定なども含め、自分のライフスタイルに合ったスタジオ選びの参考にしてください。
        </p>

        {sasazukaStudios.map((studio, index) => (
          <div
            key={studio.id}
            style={{
              margin: "40px 0",
              padding: "30px",
              backgroundColor: "#fdfbf8",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                color: "#c09090",
                fontSize: "22px",
                marginTop: "0",
                marginBottom: "18px",
              }}
            >
              {index + 1}位：{studio.name}
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                margin: "25px 0",
                backgroundColor: "#fff",
              }}
            >
              <tbody>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    店舗名
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.name}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    料金プラン
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.pricingPlan.split(" / ").map((plan) => (
                      <div key={plan}>{plan}</div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    体験レッスン有無
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.hasTrialLesson ? "あり" : "なし"}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    通い放題有無
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.hasUnlimitedPlan ? "あり" : "なし"}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    マシン有無
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.hasMachine ? "あり" : "なし"}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    住所・エリア
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.address}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    最寄駅
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.nearestStation}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    営業時間
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    {studio.businessHours}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    特徴
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    <ul
                      style={{
                        listStyleType: "none",
                        paddingLeft: 0,
                        margin: "20px 0",
                      }}
                    >
                      {studio.features.map((feature) => (
                        <li
                          key={feature}
                          style={{
                            padding: "10px 0 10px 25px",
                            position: "relative",
                            color: "#666",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              color: "#d4a5a5",
                              fontWeight: "bold",
                            }}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f5ebe0",
                      color: "#8b6f6f",
                      padding: "14px",
                      textAlign: "left",
                      border: "1px solid #e8dcd0",
                      width: "40%",
                      fontWeight: 600,
                    }}
                  >
                    公式サイトURL
                  </th>
                  <td
                    style={{
                      padding: "14px",
                      border: "1px solid #e8dcd0",
                      color: "#555",
                    }}
                  >
                    <a
                      href={studio.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#d4a5a5",
                        textDecoration: "none",
                      }}
                    >
                      {studio.officialWebsite}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <a
                href={studio.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "16px 50px",
                  backgroundColor: "#d4a5a5",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "30px",
                  fontWeight: 600,
                  transition: "background-color 0.3s ease",
                }}
              >
                詳細を見る
              </a>
            </div>
          </div>
        ))}

        <h2
          style={{
            color: "#d4a5a5",
            fontSize: "28px",
            marginTop: "50px",
            marginBottom: "25px",
            paddingBottom: "12px",
            borderBottom: "2px solid #f0e4d7",
          }}
        >
          {areaName}のピラティススタジオを選ぶポイント
        </h2>
        <p>
          ピラティススタジオを選ぶ際には、いくつかの重要なポイントを押さえておく必要があります。
        </p>

        <p>
          料金の安さだけでなく、通いやすさやレッスンの形式、設備の充実度なども総合的に判断することが大切。
        </p>

        <p>
          自分の目的や生活スタイルに合ったスタジオを選ぶことで、ピラティスを継続しやすくなり、理想の体づくりに近づけるでしょう。
        </p>

        <p>
          ここでは、スタジオ選びで失敗しないための3つの重要なポイントについて詳しく解説していきます。
        </p>

        <p>
          体験レッスンを活用しながら、自分にぴったりのスタジオを見つけてください。
        </p>

        <h3
          style={{
            color: "#c09090",
            fontSize: "22px",
            marginTop: "35px",
            marginBottom: "18px",
          }}
        >
          料金の安さで選ぶ
        </h3>
        <p>
          ピラティススタジオの料金は、月額制やチケット制、通い放題プランなどスタジオによってさまざまな設定があります。
        </p>

        <p>
          グループレッスンの場合、月4回で1万円から1万5千円程度が相場となっており、プライベートレッスンになると1回あたり8千円から1万円ほどかかることも。
        </p>

        <p>
          継続して通うことで効果が得られるピラティスだからこそ、
          <span
            style={{
              background: "linear-gradient(transparent 60%, #ffe4cc 60%)",
              fontWeight: "normal",
            }}
          >
            <strong>
              無理のない予算内で続けられる料金設定のスタジオを選ぶことが重要
            </strong>
          </span>
          でしょう。
        </p>

        <p>
          入会金やレンタル用品の費用、オプション料金なども事前に確認しておくと安心です。
        </p>

        <p>
          体験レッスンを利用すれば、料金に見合った価値があるかどうかを判断する材料にもなります。
        </p>

        <h3
          style={{
            color: "#c09090",
            fontSize: "22px",
            marginTop: "35px",
            marginBottom: "18px",
          }}
        >
          通いやすさで選ぶ
        </h3>
        <p>
          ピラティスは定期的に通い続けることで、姿勢改善やボディメイクなどの効果を実感できるエクササイズです。
        </p>

        <p>
          そのため、自宅や職場から近い場所、または通勤経路上にあるスタジオを選ぶことで、継続しやすくなるでしょう。
        </p>

        <p>
          駅からの距離や営業時間、予約の取りやすさなども重要なチェックポイント。
        </p>

        <p>
          特に
          <span
            style={{
              background: "linear-gradient(transparent 60%, #ffe4cc 60%)",
              fontWeight: "normal",
            }}
          >
            <strong>
              仕事帰りに通う予定の方は、夜遅くまで営業しているスタジオや駅近の立地を選ぶと通いやすく
            </strong>
          </span>
          なります。
        </p>

        <p>
          週末にゆっくり通いたい方は、土日祝日の営業時間やレッスンスケジュールも確認しておきましょう。
        </p>

        <h3
          style={{
            color: "#c09090",
            fontSize: "22px",
            marginTop: "35px",
            marginBottom: "18px",
          }}
        >
          レッスンの形式で選ぶ
        </h3>
        <p>
          ピラティスのレッスン形式には、グループレッスンとプライベートレッスンの2種類があります。
        </p>

        <p>
          グループレッスンは複数人で一緒にエクササイズを行うため、料金が比較的リーズナブルで、仲間と一緒に楽しみながら続けられるメリットがあるでしょう。
        </p>

        <p>
          一方、プライベートレッスンはインストラクターがマンツーマンで指導してくれるため、
          <span
            style={{
              background: "linear-gradient(transparent 60%, #ffe4cc 60%)",
              fontWeight: "normal",
            }}
          >
            <strong>
              自分の体に合わせた細かいアドバイスを受けられ、効果を実感しやすい
            </strong>
          </span>
          のが特徴です。
        </p>

        <p>
          初心者の方や体に不安がある方は、まずプライベートレッスンで正しいフォームを身につけてから、グループレッスンに移行するのもおすすめ。
        </p>

        <h2
          style={{
            color: "#d4a5a5",
            fontSize: "28px",
            marginTop: "50px",
            marginBottom: "25px",
            paddingBottom: "12px",
            borderBottom: "2px solid #f0e4d7",
          }}
        >
          {areaName}のピラティススタジオの料金相場
        </h2>
        <p>
          {areaName}
          エリアにおけるピラティススタジオの料金相場は、レッスン形式や通う頻度によって大きく異なります。
        </p>

        <p>
          グループレッスンの場合、月4回プランで1万円から1万5千円程度が一般的な価格帯となっており、通い放題プランになると月額1万5千円から2万円前後が相場。
        </p>

        <p>
          プライベートレッスンは1回あたり8千円から1万円程度で、月4回通った場合は3万円以上かかることもあるでしょう。
        </p>

        <p>
          入会金は無料のスタジオもあれば、1万円程度かかる場合もあるため、トータルコストを考慮して選ぶことが大切です。
        </p>

        <h2
          style={{
            color: "#d4a5a5",
            fontSize: "28px",
            marginTop: "50px",
            marginBottom: "25px",
            paddingBottom: "12px",
            borderBottom: "2px solid #f0e4d7",
          }}
        >
          {areaName}のピラティススタジオによくある質問
        </h2>
        <p>
          {areaName}
          でピラティススタジオを探している方から、よく寄せられる疑問についてまとめました。
        </p>

        <p>
          初めてピラティスを始める方は、持ち物や服装、入会条件など気になることが多いはず。
        </p>

        <p>
          ここでは、特に多く質問される3つのポイントについて、わかりやすく回答していきます。
        </p>

        <p>スタジオ選びや入会前の参考にしてください。</p>

        <p>
          体験レッスンを受ける際にも役立つ情報なので、ぜひチェックしておきましょう。
        </p>

        <p>不安な点を解消してから、安心してピラティスをスタートできます。</p>

        <h3
          style={{
            color: "#c09090",
            fontSize: "22px",
            marginTop: "35px",
            marginBottom: "18px",
          }}
        >
          ピラティススタジオに必要な持ち物は?
        </h3>
        <p>
          ピラティススタジオに通う際の持ち物は、基本的に動きやすいウェアと飲み物、タオルがあれば十分です。
        </p>

        <p>
          多くのスタジオでは、ヨガマットやピラティス専用の器具は用意されているため、手ぶらで通えるところも少なくありません。
        </p>

        <p>
          ただし、
          <span
            style={{
              background: "linear-gradient(transparent 60%, #ffe4cc 60%)",
              fontWeight: "normal",
            }}
          >
            <strong>
              自分専用のマットを使いたい場合は持参することもできるので、スタジオのルールを事前に確認
            </strong>
          </span>
          しておきましょう。
        </p>

        <p>
          シャワー設備があるスタジオでは、着替えやスキンケア用品を持っていくと便利。
        </p>

        <p>
          ウェアやタオルのレンタルサービスを提供しているスタジオもあるため、仕事帰りに手ぶらで通いたい方は事前にチェックしておくと良いでしょう。
        </p>

        <h3
          style={{
            color: "#c09090",
            fontSize: "22px",
            marginTop: "35px",
            marginBottom: "18px",
          }}
        >
          ピラティススタジオに行くときの服装は?
        </h3>
        <p>
          ピラティスを行う際の服装は、体の動きを妨げない伸縮性のあるウェアが基本です。
        </p>

        <p>
          ヨガウェアやスポーツウェアなど、動きやすく吸湿性に優れた素材のものを選ぶと快適にエクササイズできます。
        </p>

        <p>
          タイトすぎず、かといってゆったりしすぎない、体のラインが適度にわかる服装が理想的でしょう。
        </p>

        <p>
          足元は基本的に裸足か、
          <span
            style={{
              background: "linear-gradient(transparent 60%, #ffe4cc 60%)",
              fontWeight: "normal",
            }}
          >
            <strong>滑り止め付きの専用ソックスを着用するスタジオが多い</strong>
          </span>
          ため、シューズは不要です。
        </p>

        <p>
          おしゃれなウェアを選べば、スタジオに通うモチベーションも上がるので、自分の好みに合ったデザインを探してみてください。
        </p>

        <h3
          style={{
            color: "#c09090",
            fontSize: "22px",
            marginTop: "35px",
            marginBottom: "18px",
          }}
        >
          男性は入会できる?
        </h3>
        <p>
          {areaName}
          のピラティススタジオの中には、女性専用のスタジオと男女共用のスタジオがあります。
        </p>

        <p>
          女性専用スタジオは男性の入会ができませんが、男女共用のスタジオであれば問題なく通えるでしょう。
        </p>

        <p>
          最近では、姿勢改善や体幹強化を目的に、
          <span
            style={{
              background: "linear-gradient(transparent 60%, #ffe4cc 60%)",
              fontWeight: "normal",
            }}
          >
            <strong>
              ピラティスを始める男性も増えており、男性向けのクラスを設けているスタジオ
            </strong>
          </span>
          もあります。
        </p>

        <p>
          入会前に公式サイトや問い合わせで、男性の受け入れ状況を確認しておくとスムーズ。
        </p>

        <p>
          プライベートレッスンであれば、周りの目を気にせずに集中して取り組めるため、初めての方にもおすすめです。
        </p>

        <div
          style={{
            marginTop: "60px",
            paddingTop: "30px",
            borderTop: "2px solid #f0e4d7",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "16px 50px",
              backgroundColor: "#d4a5a5",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "30px",
              fontWeight: 600,
              transition: "background-color 0.3s ease",
            }}
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
