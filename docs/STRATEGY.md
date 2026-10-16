# Hanpan: retention, value and ads

## Why people come back (retention)

| Mechanic | Where | What brings them back |
|---|---|---|
| Daily 5 | Play → Daily 5 | Five new questions every day. Quick ones settle in minutes, others tonight or tomorrow morning, so there are always results waiting. |
| Streaks and daily bonus | Today | The check-in bonus grows each day (+50 up to +120). A 6 PM reminder fires if the streak is at risk. |
| Weekly leagues | Play | Bronze → Silver → Gold → Jade → Diamond. Top 5 move up and the bottom 2 move down every Monday. |
| Results reveal | Today banner, notifications | Settled picks queue up as a "you went 3/5" moment the next time you open the app. |
| Levels and badges | Me | 새내기 → 단골 → 고수 → 달인 → 전설, plus badges for streaks, Perfect 5, posting, sharing. |
| Perks | Perks | Points buy real offers from local businesses, so they're worth earning. |
| Friends and groups | Market pages, Groups | You see what friends picked; private leagues for church, team and alumni groups. |

## Why it's worth using even without predictions

- **Won tracker:** live USD/KRW, rate alerts, and a calculator showing what the recipient gets via bank wire versus apps.
- **Korean athletes:** every Korean player abroad, with game times in US time.
- **KBO in US time**, live game rooms, a Korean-American community calendar (Pepero Day, Suneung, gimjang season).
- **Bilingual everything**, with "see translation" on Korean posts.

## Where ads go

All advertisers in the app are fictional placeholders. Every unit is labeled Sponsored/광고 and matched to the page, not to personal data.

| Placement | Example | Why it fits |
|---|---|---|
| Won tracker sponsor | Bora Remit: "$0 fee on your first transfer" | The highest-intent placement: the user is about to send money |
| Contextual market ads | Pacific Han Bank CD on the Fed market; Gogi House on Dodgers | Ad matches the question |
| Brief sponsor | "Presented by Pacific Han Bank" | Daily, low-friction |
| Native feed ads | Every 4th post, rotating Hanbit Mart, Mira Realty, Dalbit Skin, Arirang Air, Han's Tax | Looks like content, always labeled |
| Live room sponsor | "Room presented by Gogi House" plus one sponsored chat message | Big live audiences |
| League and contest sponsors | Arirang Air (league prizes), Gogi House (KBO Challenge) | Prizes funded by sponsors |
| Results sheet | "Celebrate a good night: 15% off" | Emotional high point |
| Perks | Advertiser-funded rewards bought with points | Ads people seek out; drives store visits |
| Local events | Sponsored watch parties | Foot traffic for restaurants |

## Before launch

- Have a lawyer review the perks and prizes setup (sweepstakes and promotion rules) and the Kalshi referral terms.
- Replace hardcoded content with Kalshi's market-data API, a sports feed, an FX feed and a small editorial CMS for the Daily 5.
- Move state from localStorage to accounts on a backend so streaks, leagues and posts sync across devices and users.
