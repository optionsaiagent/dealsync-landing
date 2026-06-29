# DealSync content roadmap

The blog's job: compound into organic search traffic and position DealSync (the
shared LO–Realtor deal room) as the answer. Cadence: **one deep post every 2
weeks**. Each post is published as `src/pages/blog/<slug>.astro` using the
`BlogPost` layout, added to `src/pages/blog/index.astro` (newest first) and
`public/sitemap.xml`, and linked to/from its cluster siblings.

**Voice:** first-person, Jay Miller, 25-year loan officer. Credible, specific,
no hype, no exclamation points, real stats with sources. End each post with
`— Jay Miller`. ~1,400–1,800 words.

## Pillars
1. **Lead Nurturing & Follow-Up** — cornerstone pillar (hub: The Follow-Up Gap)
2. **The LO–Realtor Partnership** — the "shared" value prop
3. **Winning the Borrower** — communication, trust, letters, status

## Status legend: ✅ published · ⏳ next · ⬜ queued

| # | Status | Slug | Title | Pillar |
|---|--------|------|-------|--------|
| 0 | ✅ | the-follow-up-gap | The Follow-Up Gap: Why Good Mortgage Referrals Quietly Die | Nurture (hub) |
| 1 | ✅ | 5-touch-follow-up-cadence | The 5-Touch Follow-Up Cadence That Actually Converts Mortgage Leads | Nurture |
| 2 | ⏳ | what-to-say-not-ready-buyer | What to Say to a Buyer Who's "Not Ready Yet" | Nurture |
| 3 | ⬜ | pre-approval-vs-prequalification | Pre-Approval vs. Pre-Qualification vs. Conditional Approval | Borrower |
| 4 | ⬜ | lo-realtor-relationship-handoff | Why the LO–Realtor Relationship Breaks Down (and How to Fix the Handoff) | Partnership |
| 5 | ⬜ | get-keep-realtor-referral-partners | How Loan Officers Get (and Keep) More Realtor Referral Partners | Partnership |
| 6 | ⬜ | re-engage-cold-mortgage-leads | How to Re-Engage a Cold Mortgage Lead Without Being Annoying | Nurture |
| 7 | ⬜ | any-update-status-text-loop | The "Any Update?" Problem: Ending the Status-Check Text Loop | Borrower |
| 8 | ⬜ | keep-borrowers-engaged | How to Keep a Borrower Engaged from Pre-Approval to Closing | Borrower |
| 9 | ⬜ | cost-of-a-forgotten-follow-up | The Real Cost of a Forgotten Follow-Up: A Loan Officer's Math | Nurture |
| 10 | ⬜ | fast-pre-approval-letters-win-offers | How Fast Pre-Approval Letters Win Offers in a Hot Market | Borrower |

## Per-topic briefs

### 2 — What to Say to a Buyer Who's "Not Ready Yet" ⏳ NEXT
- **Keyword/intent:** "what to say to a buyer not ready to buy" · awareness · scripts (shareable)
- **Angle:** real scripts for the not-ready buyer by reason: just looking, saving down payment, lease ending, credit repair, waiting on a spouse/job. The companion to #1 (cadence = *when*, this = *what*).
- **Key points:** match the message to the *reason* they're not ready; value-first; anchor to their trigger date; sample messages for each scenario.
- **DealSync tie-in:** Coach drafts these from the deal notes; the card stores the "why" + the trigger date so the right message fires at the right time.
- **Links:** ← the-follow-up-gap, ← 5-touch-follow-up-cadence.

### 3 — Pre-Approval vs. Pre-Qualification vs. Conditional Approval
- **Keyword/intent:** "pre-approval vs pre-qualification" · awareness · **high volume evergreen** (traffic magnet)
- **Angle:** clear explainer of each stage/letter and what it means for an offer; what agents and buyers actually need to know.
- **DealSync tie-in:** issue any of these (pre-approval, CLA, final approval, VOF) on your letterhead in ~60 seconds.
- **Links:** → fast-pre-approval-letters-win-offers, → keep-borrowers-engaged.

### 4 — Why the LO–Realtor Relationship Breaks Down (and How to Fix the Handoff)
- **Keyword/intent:** "loan officer realtor relationship" / "lo realtor partnership" · awareness · thought leadership
- **Angle:** extends the cornerstone's "referral black hole" into the partnership lens — two CRMs, no shared visibility, the broken handoff.
- **DealSync tie-in:** the shared deal room is the structural fix.
- **Links:** ← the-follow-up-gap; → get-keep-realtor-referral-partners.

### 5 — How LOs Get (and Keep) More Realtor Referral Partners
- **Keyword/intent:** "how to get realtor referrals as a loan officer" · awareness/consideration · **high LO intent**
- **Angle:** the playbook to earn agent referrals + the retention half nobody covers (be the LO who makes the agent look good).
- **DealSync tie-in:** shared visibility + status links make you the partner agents keep.
- **Links:** ← lo-realtor-relationship-handoff.

### 6 — How to Re-Engage a Cold Mortgage Lead Without Being Annoying
- **Keyword/intent:** "re-engage cold leads mortgage" · awareness
- **Angle:** value-first re-engagement playbook for leads quiet 60+ days.
- **DealSync tie-in:** stalled-deal detection surfaces them; Coach's cold-lead pivot.
- **Links:** ← the-follow-up-gap, ← 5-touch-follow-up-cadence.

### 7 — The "Any Update?" Problem: Ending the Status-Check Text Loop
- **Keyword/intent:** "real estate transaction communication" · awareness
- **Angle:** the constant status-chasing between agent/LO/borrower, and how shared visibility ends it.
- **DealSync tie-in:** borrower portal + shared status.

### 8 — How to Keep a Borrower Engaged from Pre-Approval to Closing
- **Keyword/intent:** "keep borrowers engaged" / "borrower communication" · awareness
- **Angle:** the comms cadence that stops borrowers drifting (or being poached) mid-process.
- **DealSync tie-in:** live status link + milestone updates.
- **Links:** ← pre-approval-vs-prequalification.

### 9 — The Real Cost of a Forgotten Follow-Up: A Loan Officer's Math
- **Keyword/intent:** linkable thought/data piece · awareness · **shareable**
- **Angle:** quantify what one forgotten lead costs over a year (commission + the referral stream + the agent relationship).
- **DealSync tie-in:** the system that makes forgetting impossible.
- **Links:** ← the-follow-up-gap.

### 10 — How Fast Pre-Approval Letters Win Offers in a Hot Market
- **Keyword/intent:** "pre-approval letter win offer" · consideration
- **Angle:** speed of documentation as a competitive edge for the buyer's offer.
- **DealSync tie-in:** 60-second branded letters.
- **Links:** ← pre-approval-vs-prequalification.

## How the biweekly job works
1. Find the topic marked ⏳ (or the lowest-numbered ⬜ if none is ⏳).
2. Draft it per its brief + the voice rules, ~1,400–1,800 words, as a new
   `src/pages/blog/<slug>.astro` using the `BlogPost` layout.
3. Add it to `blog/index.astro` (top of `posts`) + `sitemap.xml`; add the
   ← internal links from its cluster siblings (and the cornerstone where noted).
4. `npm run build` to verify; then **open it for Jay's review before publishing**
   (his byline) rather than auto-deploying.
5. Mark it ✅ here and set the next topic ⏳.
