import React from 'react'
import { PageModel } from 'model/navModel'
import NormalLayout from 'components/layout/normalLayout'

export default Terms

function Terms() {
  let pageModel = new PageModel('Terms of Use', 'WAVE', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  return (
    <div className={'privacy-policy container'}>
      <p className={'privacy-data'}> Updated at 2022-10-11</p>
      <h2 className={'title'}>WAVE PLATFORM TERMS OF USE</h2>
      <h2 className={'privacy-general'}>1. TERMS OF USE</h2>
      <p>
        1.1 The following terms and conditions (“Terms”) set out the basis upon which Wave makes available to you the
        Platform and the Services, and these Terms shall govern your access and/or use of Platforms and the Services.
      </p>
      <p>
        1.2 Additional terms and conditions may apply to your use and/or access of certain Services on or available via
        any Platform (“Specific Terms”). The Terms and the Specific Terms shall together constitute the “Agreement”. We
        may from time to time amend or vary the terms of this Agreement, which may include [posting the amendments at
        the following URL: [•] and/or providing notice of any amendments via email or any Platforms].
      </p>
      <p>
        1.3 BY INSTALLING ANY PLATFORM OR BY CONTINUING TO ACCESS AND/OR USE ANY PLATFORM AND/OR SERVICES, YOU AGREE
        THAT YOU HAVE READ AND ACCEPTED THE AGREEMENT AND ANY AMENDMENTS THERETO. IF YOU DO NOT AGREE TO THE TERMS OF
        THIS AGREEMENT, OR AMENDMENTS THERETO, PLEASE DO NOT ACCESS AND/OR USE ANY PLATFORMS AND/OR SERVICES, OR
        IMMEDIATELY CEASE ALL ACCESS AND/OR USE OF SUCH PLATFORMS AND/OR SERVICES.
      </p>
      <h2>2. DEFINITIONS AND INTERPRETATION</h2>
      <p>
        2.1 In these Terms:
        <br /> <br />• (a) the words “Wave”, “us”, “we” or “our” and the like means [Wave Metaverse Pte. Ltd.], and
        “Wave Group” means Wave and its related corporations, subsidiaries, associates and joint ventures;
        <br /> <br />• (b) “you” (and its cognates) or “User” means the user of any Platforms and/or Services, which
        includes any corporate entity which opens an account with us;
        <br /> <br />• (c) the headings are inserted for convenience only and shall not affect the construction of this
        Agreement;
        <br /> <br />• (d) the term “person” shall include any individual, company, or association or body of persons,
        regardless whether corporate or incorporate; and
        <br /> <br />• (e) unless the context otherwise requires, words importing the singular shall include the plural
        and vice versa and words importing a specific gender shall include the other genders (male, female or neuter).
      </p>
      <p>
        2.2 In these Terms, the following words and expressions shall have the following meanings unless the context
        otherwise requires:
      </p>
      <p>
        “Account” : means [any form of access, authentication, and identification credential (including without
        limitation any digital certificate, electronic key and/or form of electronic identification), as well as any
        combination thereof (including without limitation any username, password or other login identification name or
        information) which is accepted, issued or prescribed by or on behalf of Wave for you to access the Platform
        and/or any Services];
      </p>
      <p>
        “Applicable Law” : means any applicable law, statute, declaration, decree, directive, legislative enactment,
        order, ordinance, regulation, rule or other instrument, including any subsidiary legislation, regulations and
        any codes of practice, standards of performance, advisories, guidelines, frameworks, or written directions
        issued thereunder, in each case as amended, consolidated, re-enacted or replaced from time to time;
      </p>
      <p>“Claim” : means any claim, action, application, demand, proceeding, threat or any other analogous claims;</p>
      <p>
        “Digital Assets” : means [non-fungible tokens and encrypted variable tokens built on the Newton blockchain
        network (“Newton Blockchain”) which are issued by Wave on the Platform in respect of one or more Underlying
        Asset(s);], but shall not include $NEW or any Tickets;
      </p>
      <p>
        “Losses” : means all losses, settlement sums, costs (including legal fees and expenses on a solicitor-client
        basis), penalties, fines, charges, fees, expenses, actions, proceedings, damages, claims, demands and other
        liabilities, whether foreseeable or not, and “Loss” shall be construed accordingly;
      </p>
      <p>“$NEW” : refers to the native token of the Newton Blockchain;</p>
      <p>
        “Platform” : means the Wave mobile application (“Wave App”) designed by [Wave Metaverse Pte. Ltd.] (“Wave”), the
        Wave website available at [•], and such other application, software, website, documentation, electronic key,
        digital certificate, equipment, materials or other electronic tool or platform which Wave makes available to
        access and/or use any Services, including the services, functions, information and/or other material (including
        data, databases, text, graphics, photographs, animations, audio, music, video, links, application programming
        interfaces, source codes, computer programmes or other content) displayed thereon, provided thereby, or made
        available thereunder by or on behalf of Wave;
      </p>
      <p>
        “Services” : means [the services, products and/or functionalities offered by Wave from time to time, or any part
        thereof, which allows you to, among others:
        <br />
        (i) access, view and explore Digital Assets using the Wave App;
        <br />
        (ii) use our tools, at your own discretion, to trade Digital Assets on the Wave Marketplace;
        <br />
        (iii) receive and store Digital Assets traded on the Wave Marketplace on the Wave Wallet;
        <br />
        (iv) deposit and withdraw $NEW in or from your Wave Wallet;
        <br />
        (v) issue Tickets in respect of one or more Underlying Asset(s);
      </p>
      <p>&quot;Ticket&quot; : has the meaning given to it in Clause [5.2];</p>
      <p>
        “Wave Marketplace” : means [the marketplace on the Platform for Users to trade, sell and purchase Digital Assets
        and Tickets];
      </p>
      <p>
        “Wave Wallet” : means [the digital custodial wallet that stores $NEW and Digital Assets purchased on the Wave
        Marketplace];
      </p>
      <p>“Underlying Asset” : has the meaning given to it in Clause [6.1].</p>
      <h2>3. YOUR ACCOUNT WITH US</h2>
      <p>
        3.1 You will be required to register for an Account with us before you are entitled to use the functionalities
        within the Platform and/or any Services. Without prejudice to the generality of the foregoing, we shall have the
        right, in our sole and absolute discretion, to:
        <br /> <br />• (a) determine the criteria, requirements, procedures or policies for registration; and
        <br /> <br />• (b) review, evaluate, approve and/or reject any registration,
      </p>
      <p>and any decision by us in connection therewith shall be final and binding on you.</p>
      <p>
        3.2 In registering for any Account with us, you represent and warrant that:
        <br /> <br />• (a) you have the full power and capacity to enter into and perform these Terms;
        <br /> <br />• (b) you possess the legal authority to create a legally binding obligation between yourself and
        us (or any Other User (as defined below));
        <br /> <br />• (c) if you are an individual and are creating an account for a corporate/business entity, that
        you are an agent for and act on behalf of the corporate/business entity and that you have the legal authority to
        create a legally binding obligation between the said corporate/business entity and us (or any Other User (as
        defined below));
        <br /> <br />• (d) if you are not a natural person, you are duly established and existing under the laws of your
        jurisdiction of incorporation; and
        <br /> <br />• (e) all information provided by you in connection with such registration is complete, true and
        accurate.
      </p>
      <p>
        3.3 You acknowledge and agree that any access and/or use of the Platform and/or any Services, whether authorised
        or not, referable to your Account shall be deemed your access and/or use of the same (as the case may be).
      </p>
      <p>
        3.4 Without prejudice to the generality of the foregoing, you acknowledge and agree that you:
        <br /> <br />• (a) are solely responsible for any Account which we may provide to you from time to time;
        <br /> <br />• (b) shall only access and/or use the Platform and/or any Services through your Account; and
        <br /> <br />• (c) are solely responsible for and shall have a continuing obligation to maintain up-to-date and
        accurate information as you may from time to time submit to us in connection with your access and/or use of the
        Platform and/or any Services, including any information submitted to us in connection with your Account.
      </p>
      <p>
        3.5 You further acknowledge and agree that you shall:
        <br /> <br />• (a) safeguard your Account, including but not limited to your credentials and passwords(s), which
        you shall not disclose to any third party, and take all necessary steps to prevent disclosure (whether
        accidental or otherwise) of any Account to any unauthorised person, including not keeping a record of any
        Account in a way which may allow any third party to misuse such Account;
        <br /> <br />• (b) if you keep a record of any Account, exercise all reasonable endeavours to secure such record
        by: (i) keeping the record in a secure electronic or physical location accessible or known only to you; and (ii)
        keeping the record in a place where the record is unlikely to be accessed by any unauthorised person;
        <br /> <br />• (c) if you discover or suspect that any Account is disclosed to or discovered by any unauthorised
        person, or you have any reason for suspecting that the security or confidentiality of any Account has been
        compromised (including without limitation unauthorised use), immediately inform us and request for a
        substitution of any Account; and
        <br /> <br />• (d) be solely responsible and liable for all Losses and/or consequences arising from or in
        connection with any failure to comply with any of the foregoing.
      </p>
      <p>
        3.6 We may from time to time introduce any feature where you may use biometric authentication (including without
        limitation fingerprint or facial recognition) on your device (“Biometric Authentication”) to authenticate your
        identity. If you activate any such feature, you further agree that:
        <br /> <br />• (a) such Biometric Authentication relies on hardware and software provided by your device
        manufacturer or other service providers, over which we have no control;
        <br /> <br />• (b) use of such Biometric Authentication is at your own risk, and we have the right to deem all
        transactions so authenticated as having been carried out by you; and
        <br /> <br />• (c) we have no liability for any error, breach, delay or failure of the manufacturer of your
        device or any supplier or provider of any Biometric Authentication feature, and we are not responsible for the
        performance or non-performance of their obligations to you (if any).
      </p>
      <p>
        3.7 IF YOU ACCESS AND/OR USE THIS PLATFORM, YOU CONFIRM (AND WE ARE ENTITLED TO ASSUME WITHOUT FURTHER INQUIRY)
        THAT YOU ARE AT LEAST 18 YEARS OF AGE OR OF THE RELEVANT AGE OF MAJORITY UNDER APPLICABLE LAW. IF YOU ARE
        YOUNGER THAN 18 YEARS OF AGE OR THE RELEVANT AGE OF MAJORITY UNDER APPLICABLE LAW (“MINOR”): (A) YOU MUST OBTAIN
        PERMISSION FROM A PARENT OR A LEGAL GUARDIAN (IF APPLICABLE) TO ACCESS AND/OR USE THE PLATFORM AND/OR ANY
        SERVICES; (B) THAT PARENT OR LEGAL GUARDIAN (AS THE CASE MAY BE) MUST AGREE TO THESE TERMS; AND (C) YOU CAN ONLY
        USE THE PLATFORM AND/OR ANY SERVICES ONLY IN CONJUNCTION WITH AND UNDER THE SUPERVISION OR CONSENT OF A PARENT
        OR LEGAL GUARDIAN. IF YOU ARE THE PARENT OR LEGAL GUARDIAN OF A MINOR, YOU MUST ACCEPT THIS AGREEMENT ON THE
        MINOR’S BEHALF AND YOU WILL BE RESPONSIBLE FOR ALL ACCESS AND/OR USE OF ANY PLATFORM UNDER THIS AGREEMENT.
      </p>
      <p>
        3.8 If you are the parent or legal guardian of a Minor, you further agree, acknowledge and undertake that:
        <br /> <br />• (a) you should and shall carefully supervise that minor’s access and/or use of the Platform;
        <br /> <br />• (b) it is your responsibility (i.e. as the parent or legal guardian, as the case may be) to
        determine whether any part of the Platform is appropriate and/or safe for that minor;
        <br /> <br />• (c) to pay in full all sums due from that Minor in connection with the Platform, including
        without limitation any transactions made on or through the Platform; and
        <br /> <br />• (d) YOU HEREBY EXPRESSLY CONSENT on behalf of that minor to the collection, use, disclosure
        and/or processing of that Minor’s personal data in accordance with this Agreement, and you agree that we may
        deem the same.
      </p>
      <h2>4. YOUR USE OF THE PLATFORM </h2>
      <p>
        4.1 Subject always to your continuing compliance with the terms of this Agreement, we grant you a personal,
        non-transferable, non-exclusive, non-sublicensable licence to use the Platform, on and subject to the terms of
        this Agreement. All other rights not expressly granted to you are reserved by us.
      </p>
      <p>
        4.2 [Some software components used in the Platform may be offered under an open source or other licence as we
        may notify you of, in which case your use of those components is governed by such third party terms, in addition
        to the terms under this Agreement.]
      </p>
      <p>
        4.3 To the maximum extent permitted by Applicable Law, you shall not (and shall not knowingly allow, permit, or
        assist any person to):
        <br /> <br />• (a) copy, rent, lease, sub-licence, loan, translate, merge, adapt, vary or modify the Platform or
        any part thereof;
        <br /> <br />• (b) make alterations to, or modifications of, the whole or any part of the Platform, nor permit
        the Platform to be combined with (or become incorporated with or in) any other program(s);
        <br /> <br />• (c) disassemble, decompile, reverse-engineer, reverse-assemble, attempt to derive the source code
        of, communicate, republish, upload, post, transmit, edit, re-use, adapt, modify, rent, lease, loan, sell,
        assign, transfer, distribute, perform, display, license, sub-license or create derivative works based on the
        whole or any part of the Platform;
        <br /> <br />• (d) provide or otherwise make available the Platform in whole or in part (including object and
        source code), in any form to any person, or operate or use the Platform on behalf of any such person or for its
        benefit, without our prior written consent;
        <br /> <br />• (e) use the Platform in any unlawful manner, for any unlawful purpose, or in any manner
        inconsistent with this Agreement, including but not limited to:
        <br /> (i) using the Platform in any manner to violate the rights of any person or to engage in any conduct,
        whether on its own or in combination with other acts, which is in contravention of any Applicable Law; and/or
        <br /> (ii) transmitting or allowing the transmission via the Platform of any unlawful, harmful, vulgar, obscene
        material or any material that encourages conduct that could constitute a criminal offence, give rise to civil
        liability or otherwise violate any Applicable Law; and/or
        <br /> <br />• (f) use the Platform in a way that could damage, disable, overburden, impair or compromise the
        Platform or interfere with another person’s usage or access to the Platform, including without limitation:
        <br /> (i) attempting to probe, scan, test the vulnerability of or gain unauthorised access to a system or
        network or to breach or circumvent security or authentication measures without proper authorisation; and/or
        <br /> (ii) submitting a computer virus to the Platform, or overloading, “flooding”, “mailbombing” and/or
        “crashing” the Platform; and/or
        <br /> <br />• (g) create a false identity on the Platform, impersonate any person or entity, or falsely state
        or otherwise misrepresent you or your affiliation with any person or entity, including giving the false or
        misleading impression that any content you upload, post, transmit, distribute or otherwise make available
        emanates from the Platform or another&apos;s account;
      </p>
      <p>
        4.4 You consent to us accessing and/or using certain functionalities on your device (and the data stored therein
        and on any cloud based or remote storage accounts) for the purposes of providing you with any Services and the
        other purposes set forth in these Terms.
      </p>
      <p>
        4.5 You further acknowledge and agree that:
        <br /> <br />• (a) it shall be your own responsibility to, at your own cost to obtain all necessary hardware,
        software and communications services necessary for your access and/or use of the Platform and to protect against
        any security or other vulnerabilities which may arise in connection with the use; and
        <br /> <br />• (b) we shall have the right to investigate and prosecute any violation of the terms and
        conditions of this Agreement to the fullest extent permitted under Applicable Law. You agree to grant us all
        assistance we deem necessary in connection with any such investigation or prosecution. We may involve and
        cooperate with law enforcement authorities in prosecuting Users who violate the above provisions.
      </p>
      <p>
        4.6 We may from time to time, without giving any prior reason or notice, upgrade, modify, alter, suspend,
        discontinue the provision of or remove, whether in whole in part, the Platform and/or any Services and shall not
        be liable if any such upgrade, modification, suspension or alteration prevents you from accessing the Platform
        and/or any Services, or any part or feature thereof.
      </p>
      <p>
        4.7 From time to time we may (but shall not be obliged to) update the Platform to improve performance, enhance
        functionality, reflect changes to the operating system and/or address security issues. Alternatively, we may ask
        you to update the Platform for these reasons. If you choose not to install such updates or if you opt out of
        automatic updates, you may not be able to continue using the Platform, and we may forthwith terminate your
        Account and access to the Platform.
      </p>
      <p>
        4.8 We may at any time from time to time have the right to add or remove any features comprised in the Platform
        in our sole and absolute discretion, or to levy fees or charges for access or continued access to any features.
        You agree that you shall not have any claim or remedy against us in connection with the removal of any such
        feature.
      </p>
      <h2>5. TRADING OF DIGITAL ASSETS AND TICKETS</h2>
      <p>
        5.1 You can trade Digital Assets on the Wave Marketplace by:
        <br /> <br />• (a) buying Digital Assets from us on the Wave Marketplace;
        <br /> <br />• (b) selling Digital Assets to other Users in the Wave Marketplace; and/or
        <br /> <br />• (c) buying Digital Assets from other Users in the Wave Marketplace.
      </p>
      <p>
        5.2 If you have purchased Digital Assets from us or other Users (as the case may be), you may issue digital
        tickets in respect of the Underlying Assets (&quot;Tickets&quot;). You can trade Tickets on the Wave Marketplace
        by:
        <br /> <br />• (a) selling Tickets to other Users in the Wave Marketplace; and/or
        <br /> <br />• (b) buying Tickets from other Users in the Wave Marketplace,
      </p>
      <p>(the transactions in 5.1 and 5.2, each, a “Transaction”). </p>
      <p>
        5.3 By making any Transaction through the Wave Marketplace, you acknowledge and agree that:
        <br /> <br />• (a) any dispute, cancellation, refund, and/or return in connection with any Transaction shall be
        subject to such additional policies and guidelines as may be prescribed by us from in connection with the same
        from time to time.
      </p>
      <p>
        5.4 You further acknowledge and agree that, to the extent that a Transaction on the Wave Marketplace is entered
        into between you and another User (“Other User”):
        <br /> <br />• (a) all Transactions are entered into between you and the Other User. The Other User is and
        remains the seller or buyer, as the case may be, of the relevant Digital Asset, and we are not party to such
        Transaction and/or any agreements that may be entered into between you and the Other User, even if terms may be
        prescribed by us in respect of such Transactions, and we are not responsible for the acts or omissions of the
        Other User in connection therewith;
        <br /> <br />• (b) we neither endorse nor assume any responsibility or liability arising in connection with any
        such Transaction (or any Digital Asset in respect of which such Transaction is carried out). Save as expressly
        provided under these Terms, we shall not have any obligation in connection with any such Transactions;
        <br /> <br />• (c) we:
        <br /> (i) shall not be responsible for procuring;
        <br /> (ii) do not warrant; and
        <br /> (iii) do not undertake, that you shall comply or have complied (whether in whole or in part) with the
        terms and conditions governing any such Transaction;
      </p>
      <h2>6. OWNERSHIP OF DIGITAL ASSETS AND TICKETS</h2>
      <p>
        6.1 Each Digital Asset and Ticket you purchase (“Purchased Digital Assets and Tickets”) that is traded on the
        Wave Marketplace is associated with certain media, including, without limitation, [films, television dramas,
        collectibles, [•]] (“Underlying Assets”).
      </p>
      <p>
        6.2 Subject to your continued compliance with these Terms, we grant you a non-exclusive, worldwide,
        non-transferable, royalty free license to use, copy, and/or display the Underlying Assets associated with your
        Purchased Digital Assets and Tickets, solely for the following purposes:
        <br /> <br />• (a) [your own personal, non-commercial use];
        <br /> <br />• (b) [as part of the Wave Marketplace that permits the trading of your Purchased Digital Assets];
        <br /> <br />• (c) [•]; or
        <br /> <br />• (d) [such other rights as may be notified to you at the point of sale of the relevant Digital
        Asset].
      </p>
      <p>
        6.3 Except for the foregoing license, and unless expressly stated otherwise at the point of sale of the relevant
        Digital Asset and/or Ticket, your purchase of any Digital Asset and/or Ticket does not grant you any other
        rights, title and interest in and to the Underlying Assets, including any and all copyrights, trade mark rights,
        trade secret rights, patent rights, database rights and any other intellectual property and proprietary rights
        therein. Without generality to the foregoing, if the Underlying Assets contains third party intellectual
        property rights (“Third Party IP”), you acknowledge and agree that:
        <br /> <br />• (a) you will not have the right to use such Third Party IP in any way except as incorporated in
        the Underlying Assets, and subject always to the license and restrictions as set out in this Clause;
        <br /> <br />• (b) depending on the nature of the license granted from the owner of the Third Party IP, we may
        need to (and reserve every right to) pass through additional restrictions on your ability to use the Underlying
        Asset; and
        <br /> <br />• (c) you will be responsible for complying with all such restrictions and that failure to do so
        will be deemed a breach of the license granted pursuant to Clause 6.2.
      </p>
      <p>
        6.4 You further acknowledge and agree that you shall not, nor permit any third party to do or attempt to do any
        of the foregoing without our (or, as applicable, our licensors’) express prior written consent in each case:
        <br /> <br />• (a) [modify the Underlying Assets in any way, including, without limitation, the shapes, designs,
        drawings, attributes, or color schemes];
        <br /> <br />• (b) [use the Underlying Assets to advertise, market, or sell any third party product or service];
        <br /> <br />• (c) [use the Underlying Assets in connection with images, videos, or other forms of media that
        depict hatred, intolerance, violence, cruelty, or anything else that could reasonably be found to constitute
        hate speech or otherwise infringe upon the rights of others];
        <br /> <br />• (d) [use the Underlying Assets in movies, videos, or any other forms of media, except to the
        limited extent that such use is expressly permitted in these Terms or solely for your own personal,
        non-commercial use];
        <br /> <br />• (e) [sell, distribute for commercial gain (including, without limitation, giving away in the
        hopes of eventual commercial gain), or otherwise commercialize merchandise that includes, contains, or consists
        of the Underlying Assets];
        <br /> <br />• (f) attempt to trademark, copyright, or otherwise acquire additional intellectual property rights
        in or to the Underlying Assets];
        <br /> <br />• (g) [otherwise utilize the Underlying Assets for your or any third party’s commercial benefit];
        <br /> <br />• (h) [•]; or
        <br /> <br />• (i) [such other rights as may be notified to you at the point of sale of the relevant Digital
        Asset and/or Ticket].
      </p>
      <h2>7. PAYMENT FOR TRANSACTIONS; [WAVE WALLET]</h2>
      <p>
        7.1 Any Transaction made on or through the Platform (including any and all payments made in connection with any
        Digital Assets and/or Tickets on Wave Marketplace) shall be [conducted solely through the Newton Blockchain]. We
        have no liability to you or to any third party for any claims or damages that may arise as a result of any
        Transactions that you engage in on or through the Platform, or any other payment or transactions that you
        conduct via the Newton Blockchain. You are solely responsible for all amounts payable associated with
        Transactions you make on the Platform.
      </p>
      <p>
        7.2 Transactions on the Wave Marketplace may be subject to fees, commissions, royalties and other charges,
        including, but not limited to:
        <br /> <br />• (a) Wave Marketplace service fees associated with Transactions between Users and/or you and us
        (“Wave Marketplace Fees”). We may change the Wave Marketplace Fees for any feature of the Service, including
        additional fees or charges, with or without advance notice to you;
        <br /> <br />• (b) [commissions and/or royalties on primary sales and secondary sales of Digital Assets and/or
        sales of Tickets, payable to the copyright owners of the relevant Underlying Assets]; and
        <br /> <br />• (c) gas fees paid in $NEW as consideration for executing your Transactions on the Newton
        blockchain (“Gas Fees”). Except as otherwise as expressly set forth in this Agreement, you will be solely
        responsible to pay any Gas Fee for any Transaction that you make on or through the Platform (including any and
        all payments made in connection with any Digital Assets and/or Tickets on the Wave Marketplace),
      </p>
      <p>(collectively “Fees”). </p>
      <p>
        7.3 Before you pay any Fees for any Transaction made on or through the Platform (including any and all payments
        made in connection with any Digital Assets on Wave Marketplace), you will have an opportunity to review and
        accept the Fees that you will be charged. All Fees are in [$NEW] and are non-refundable except as required by
        Applicable Law.
      </p>
      <p>
        7.4 We reserve the right to determine the pricing for the Services, including any Fees chargeable. Except as
        expressly set out under applicable refund policies as may be notified to you by us, all sales are final, and no
        returns and/or refunds are permitted. If a return and/or refund is granted for any Transaction, the Transaction
        may be reversed, and you further agree to bear all taxes and other duties payable thereon.
      </p>
      <h2>8. USER CONTENT</h2>
      <p>
        8.1 Users of our Services may be permitted to upload, post or transmit or otherwise make available content
        through our Services including, without limitation, any customer reviews, materials, information, news,
        advertisements, listings, data, input, text, songs, audio, videos, photographs, graphics, software, blogs,
        webcasts, podcasts, broadcasts, messages, software, comments, suggestions, and other content (“User Content”).
      </p>
      <p>
        8.2 We do not monitor, pre-screen or exercise editorial control over User Content, and are not responsible for
        the same.
      </p>
      <p>
        8.3 We shall have the right to screen, delete and/or remove any User Content if we receive a complaint from
        another User or a notice of intellectual property infringement or other legal instruction for removal, or which
        in our sole and absolute opinion violates this Agreement, or is otherwise illegal or objectionable, or any other
        reason as we may see fit.
      </p>
      <p>
        8.4 We may also block communication by you (including but not limited to feedback, postings, messages and/or
        chats) to or from the Platform as part of our effort in protecting the Platform and/or our other Users, or
        otherwise enforcing the provisions of this Agreement.
      </p>
      <p>
        8.5 When you submit User Content through the Platform and/or any Services, you agree and represent that you own
        that User Content, or that you have received all necessary permissions, clearances from, or are authorised by,
        the owner of any part of the content to submit it to our Platform and/or Services for all purposes contemplated
        under this Agreement, to transmit it from our Platform and/or Services to other third party platforms, adopt or
        integrate any third party content (as the case may be), and grant us all licences in User Content as
        contemplated under this Agreement.
      </p>
      <h2>9. INTELLECTUAL PROPERTY RIGHTS</h2>
      <p>
        9.1 You acknowledge and agree that the Platform, any Services as well as any content, information or other
        material provided via the Platform and all intellectual property rights comprised in and associated therewith
        (collectively, “Platform IPR”) which you may have access to are owned by the Wave Group or the relevant third
        parties (as the case may be, and as applicable) (“Relevant Owner”), and may not be copied, imitated or used, in
        whole or in part, without the permission of the Relevant Owner.
      </p>
      <p>
        9.2 By your creation, transmission, posting and/or uploading of User Content on or through any Platform, you
        hereby grant to the Wave Group a non-exclusive, worldwide, perpetual, irrevocable, royalty free, sub-licensable
        right to use and exercise any of the rights comprised in any intellectual property and/or other rights
        (including without limitation, rights in copyright, publicity, and database rights) you have in your User
        Content in connection with hosting, using, distributing, modifying, running, copying, publicly performing,
        communicating, displaying, translating and creating adaptations and derivative works of your User Content.
      </p>
      <p>
        9.3 To the maximum extent permitted by Applicable Law, you agree that you shall not reproduce, distribute,
        adapt, modify, republish, display, broadcast, hyperlink, frame or transmit in any manner or by any means or
        store in an information retrieval system, any part(s) of the Platform IPR without the prior written permission
        of the Relevant Owner. Any rights not expressly granted herein are expressly withheld.
      </p>
      <p>
        9.4 The licences granted herein do not confer on you any rights to use any logos, service marks, slogans,
        product names and designations and other proprietary indicia used as part of any Platform, all of which are and
        remain the property of the Wave Group or the Relevant Owner(s), and the Wave Group or the Relevant Owner(s) own
        and retain, solely and exclusively, all rights, title and interest in and to the Platform, and all Platform IPR
        that we make available to you through the Platform, including but not limited to any and all copyrights,
        trademark rights, trade secret rights, patent rights, database rights and other intellectual property and
        proprietary rights therein.
      </p>
      <h2>10. THIRD PARTY CONTENT AND SITES </h2>
      <p>
        10.1 The Platform may from time to time display, publish or make available content that is provided by third
        parties (including for example, third party User Content, content or catalogues provided by Users, marketplace
        aggregators, information providers, or our business partners) (“Third Party Content”). You acknowledge and agree
        that such content is the sole responsibility of the person or entity that makes it available, and we are not
        responsible for such Third Party Content, and we neither have control over the selection thereof, nor do we
        routinely monitor such content. We make no representations or warranties as to the veracity or accuracy of such
        content, the reproduction and use of which may be governed by the Third Party Content provider’s terms of use.
      </p>
      <p>
        10.2 You further acknowledge and agree that any use by you of any content made available through any Platform
        (including Third Party Content) is entirely at your own risk. We do not verify and are not in a position to
        verify any party’s rights to submit any content on any Platform, and we take no responsibility and assume no
        liability, whether direct or indirect or any incidental, special, indirect or consequential damages whatsoever,
        including, without limitation, damages for loss of profits or any other commercial damages or Losses, for any
        content provided by any third party, or for your access and/or use of the same.
      </p>
      <p>
        10.3 You acknowledge and agree that we have the right (but not the obligation) to remove or disable access to
        any content which we deem to be potentially defamatory of any person, unlawful, objectionable in any way, in
        violation of any third party rights, or for any reason whatsoever. Any editing or removal of any such content
        from any Platform shall be without prejudice to our other rights and remedies available at law or in equity.
      </p>
      <p>
        10.4 Links to third party sites and/or applications may be made available on the Platform (“Third Party Sites”).
        We have no control over such Third Party Sites, and you acknowledge and agree that we are not responsible for
        the availability of such external sites or resources, and do not endorse and are not responsible or liable for
        any content, advertising, products, services or materials on or available through such Third Party Sites or
        resources, including Third Party Content. You further acknowledge and agree that we shall not be responsible or
        liable, directly or indirectly, for any damage or loss caused by or in connection with access and/or use of or
        reliance on any content, goods or services on or available through any such Third Party Site or resource.
      </p>
      <p>
        10.5 You further acknowledge that your access to and/or use of Third Party Sites is entirely at your own risk,
        and that Third Party Sites usually have their own terms and conditions, including privacy policies, over which
        we have no control and which will govern your rights and obligations with respect to the access and/or use of
        those sites and resources.
      </p>
      <p>
        10.6 We do not warrant that the Third Party Sites will meet your requirements or that the same will not cause
        you any loss of any kind, and you agree that to the maximum extent permitted by law, we shall not be liable for
        any loss or damage of any kind incurred in connection with your use or reliance on any content, information or
        other materials on or available through such third parties.
      </p>
      <p>
        10.7 The information and data contained in the Platform are of a general nature which have not been verified,
        considered or assessed by us in relation to the making of any specific investment, business or commercial
        decision. You should at all times consult your professional advisers and obtain independent verification of the
        information and data contained herein before making any decision based on any such information or data. Nothing
        on the Platform shall be considered or construed as the giving of any advice in respect of, shares, stocks,
        bonds, notes, interests, unit trusts, property trusts, mutual funds or other securities, investments, loans,
        advances, credits or deposits in any jurisdiction.
      </p>
      <h2>11. PERSONAL DATA</h2>
      <p>
        11.1 It is a continuing condition of your access and/or use of the Platform and Services that you agree and
        consent to the terms of our privacy policy as amended from time to time, available at [•] (“Privacy Policy”).
        The terms of the Privacy Policy are incorporated into this Agreement by reference.
      </p>
      <h2>12. INDEMNITY</h2>
      <p>
        12.1 You hereby unconditionally undertake to indemnify, defend and hold us (and/or Wave Group, as well as their
        respective employees, servants, officers, agents, directors, partners and/or permitted assigns) (collectively,
        the “Indemnitees”) harmless from and against any and all Losses which may be sustained, instituted, made or
        alleged against (including without limitation any Claim or prospective Claim in connection therewith), or
        suffered or incurred by any Indemnitee, and which arise (whether directly or indirectly) out of or in connection
        with:
        <br /> <br />• (a) your breach of your representations, warranties, undertakings or obligations under this
        Agreement;
        <br /> <br />• (b) your breach of any Applicable Law;
        <br /> <br />• (c) your violation of any rights, including without limitation the intellectual property rights
        of any third party;
        <br /> <br />• (d) any transactions entered into by you or to which your credentials have been applied;
        <br /> <br />• (e) your access and/or use of the Platform (including the functions available via any Platform)
        and/or any Services (including without limitation any Claims by or against any other Users); and/or
        <br /> <br />• (f) any action taken by us either as part of our investigation of any suspected breach of this
        Agreement or as a result of our finding or decision that a breach of this Agreement has occurred.
      </p>
      <p>12.2 This Clause 12 shall survive the termination or expiration of this Agreement (howsoever caused). </p>
      <h2>13. DISCLAIMER OF WARRANTIES AND LIABILITY</h2>
      <p>
        13.1 To the maximum extent permitted by Applicable Law, you agree and acknowledge that:
        <br /> <br />• (a) the Platform and Services are provided on an “AS IS” and “AS AVAILABLE” basis. We do not
        warrant the accuracy, adequacy or completeness of the Platform and any Services, and expressly disclaim
        liability for errors or omissions in the Platform and any Services; and
        <br /> <br />• (b) WE HEREBY EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, STATUTORY OR IMPLIED, ORAL OR
        IN WRITING, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF NON-INFRINGEMENT OF THIRD PARTY RIGHTS, TITLE,
        SATISFACTORY QUALITY, ACCURACY, ADEQUACY, COMPLETENESS, TIMELINESS, MERCHANTABILITY, CURRENCY, RELIABILITY,
        PERFORMANCE, SECURITY, FITNESS FOR A PARTICULAR PURPOSE, CONTINUED AVAILABILITY, OR INTER-OPERABILITY WITH OTHER
        SYSTEMS OR SERVICES, AND NO SUCH WARRANTY OR REPRESENTATION IS GIVEN IN CONJUNCTION WITH THE PLATFORM AND ANY
        SERVICES.
      </p>
      <p>
        13.2 You further agree and acknowledge that:
        <br /> <br />• (a) the access and/or use of the Platform is entirely at your own risk, and the Platform may use
        transmissions over the Internet which are never completely private or secure. You understand that any personal
        data, message or information which you send in the course of the access and/or use of the Platform may be made
        public on the Platform, and also read or intercepted by others;
        <br /> <br />• (b) the Platform may also use digital certificates, tokens or security credentials, and that we
        are entitled to treat any transactions or records thereof to which the same have been applied as conclusive
        evidence of the same and to have been entered into by you. You shall be solely responsible for all transactions
        to which any digital certificates, tokens or security credentials associated with you have been applied; and
        <br /> <br />• (c) the Platform is not intended or suitable for use in situations or environments where the
        failure or time delays of, or errors or inaccuracies in, the content, data or information provided by the
        Platform could lead to death, personal injury, or otherwise result in significant financial loss or business
        interruption.
      </p>
      <p>
        13.3 Notwithstanding any other provision in this Agreement, to the maximum extent permitted by Applicable Law,
        in no event shall Wave (and/or Wave Group, as well as their respective employees, servants, officers, agents,
        directors, partners and/or permitted assigns) be liable to you or any other party for any Losses, fines, or
        penalties (or other levies or charges imposed by any governmental or regulatory authority), even if informed of
        the possibility thereof, arising from or in connection with:
        <br /> <br />• (a) your breach of your representations, warranties, undertakings or obligations under this
        Agreement;
        <br /> <br />• (b) any access, use or the inability to access and/or use the Platform and/or any Services, or
        reliance on any Services and/or any information in the Platform;
        <br /> <br />• (c) any delays, delivery failures, or any other loss or damage resulting from the transfer of
        data over communications networks and facilities, including the internet;
        <br /> <br />• (d) any access and/or use any other website linked to or from the Platform;
        <br /> <br />• (e) any participation in respect of or in connection with any of our rewards, redemption or
        membership programmes;
        <br /> <br />• (f) any products, information, data, software or other material obtained from the Platform or
        from any other website linked to the Platform;
        <br /> <br />• (g) any use of any Services provided under the Platform, even if we or our agents or employees
        were previously advised of the possibility of such damages, losses and/or expenses.
        <br /> <br />• (h) any action, instruction, direction, order, request, and/or guidelines of a relevant
        authority;
        <br /> <br />• (i) any matters or Losses disclaimed in the Specific Terms;
        <br /> <br />• (j) Losses which are of an indirect, incidental, consequential, special or exemplary nature of
        any kind, regardless of the cause thereof; and/or
        <br /> <br />• (k) any loss of: (i) revenue; (ii) business and/or business opportunities; (iii) anticipated
        savings; (iv) profit; (v) data; (vi) goodwill; and/or (vii) value of any equipment.
      </p>
      <p>
        13.4 To the extent not excluded, and/or to the extent not lawfully excluded, the Wave Group’s maximum aggregate
        liability for all Claims, suits, demands, actions or other legal proceedings in connection with this Agreement,
        whether based on an action or claim in contract, negligence, tort or otherwise, shall not exceed SGD [•].
      </p>
      <h2>14. TERMINATION</h2>
      <p>
        14.1 We shall have the right to terminate and/or suspend your access and/or use to any Service, any Platform
        functionality, any feature of or the Platform as a whole at any time for whatsoever reason, and without any
        prior notice to you.
      </p>
      <p>
        14.2 Without prejudice to the generality of the foregoing, we reserve the right to immediately suspend and/or
        terminate your account if:
        <br /> <br />• (a) you breach this Agreement;
        <br /> <br />• (b) any material information provided or representation made by you to us is untrue or misleading
        or otherwise has an adverse material impact on us or other Users;
        <br /> <br />• (c) we believe that you are accessing and/or using your account for fraudulent and/or dishonest
        activities; and/or
        <br /> <br />• (d) required by Applicable Law.
      </p>
      <p>
        14.3 In the event of suspension or termination of your access and/or use of the Platform, you shall remain
        liable for all payment transactions and/or any other obligations you may have incurred under this Agreement.
      </p>
      <h2>15. NOTIFICATION OF INFRINGEMENT </h2>
      <p>
        15.1 Wave reserves the right to investigate notices of copyright, trademark and other intellectual property
        infringement (“Infringement”) in respect of User Content and other material on the Platform (“Infringing
        Material”) and take appropriate action. If you believe that your work has been used or copied in a way that
        constitutes Infringement and such Infringement is occurring on the Platform, please notify us in writing
        immediately in the form and containing the information prescribed by the Singapore Copyright Act 2021
        (“Infringement Notice”).
        <br />
        All Infringement Notices shall be sent to Wave addressed as follows:
      </p>
      <p>
        15.2 We will duly consider all Infringement Notices submitted in the above manner. In return, you agree that you
        shall not take any legal action or exercise any legal remedy you may have against Wave in respect of any
        Infringing Material, unless you have first given us the Infringement Notice and sufficient opportunity to remove
        the Infringing Material, and thereafter we refuse or fail to remove the Infringing Material within a reasonable
        time. Where we remove the Infringing Material in response to your Infringement Notice, you agree not to exercise
        and you hereby waive, any right of action against Wave under applicable law which you may have in respect of any
        Infringing Material appearing on the Platform prior to such removal by us.
      </p>
      <p>
        15.3 You acknowledge and agree that we have no control and cannot undertake responsibility or liability in
        respect of Infringing Material appearing on Third Party Sites.
      </p>
      <h2>16. GENERAL</h2>
      <p>
        16.1 Assignment: This Agreement is personal to you, and shall not be assigned or novated either as to the whole
        or any part thereof, without our prior written consent. We may, by notification to you, assign or novate the
        whole or any part of this Agreement to any party, and you shall be deemed to have consented to such assignment
        or novation, which shall be effective on the date that we notify you.
      </p>
      <p>
        16.2 Costs: Unless otherwise stated herein, you shall bear your own legal and other costs and expenses of and
        incidental to this Agreement, and you shall perform all of your obligations under this Agreement at your sole
        cost and expense.
      </p>
      <p>
        16.3 Entire Agreement: This Agreement, and the documents referred to in it, embodies the entire agreement and
        understanding between you and us relating to the subject matter of this Agreement, and supersedes all prior
        agreements and understandings relating to the subject matter hereof.
      </p>
      <p>
        16.4 Force Majeure: Save as otherwise specifically provided in this Agreement, we shall not be liable for
        failures or delays in performing our obligations hereunder arising from any cause beyond our control, including
        acts of God, acts of civil or military authority, fires, strikes, lockouts or labour disputes, epidemics,
        pandemics, governmental restrictions, wars, riots, earthquakes, storms, typhoons, floods and breakdowns in
        electronic and computer information and communications systems (“Force Majeure Event”) and in the event of any
        Force Majeure Event, the time for our performance may be extended by us at our sole and absolute discretion for
        a period equal to the time lost by reason of the delay.
      </p>
      <p>
        16.5 Illegality/Severability: The provisions of this Agreement are severable, and if any provision, or any
        portion thereof, is determined by a competent court or tribunal to be illegal, invalid or unenforceable for any
        reason, any remaining portion of that provision, and all other provisions of this Agreement, shall remain valid
        and enforceable to the fullest extent permitted by applicable law in order to give effect to the intentions of
        the parties to this Agreement.
      </p>
      <p>
        16.6 No Partnership: The parties to this Agreement hereto are independent contractors, and nothing in this
        Agreement shall create, or be deemed to create, a partnership, joint venture or agency relationship between the
        parties to this Agreement.
      </p>
      <p>
        16.7 No Waiver / Cumulative Rights: No omission or delay by a party to this Agreement in exercising any or part
        of its rights under this Agreement shall operate as a waiver thereof. Unless expressly stated otherwise (i.e.
        expressed to be an exclusive right or remedy), the rights and remedies provided in this Agreement are cumulative
        and not exclusive of any rights or remedies (whether provided by law or otherwise).
      </p>
      <p>
        16.8 Third Party Rights: A person who is not a party to this Agreement has no right under the Contracts (Rights
        of Third Parties) Act 2001 of Singapore to enforce any term of this Agreement.
      </p>
      <h2>17. GOVERNING LAW</h2>
      <p>
        The Agreement and any dispute or Claim arising out of or in connection with it or its subject matter or
        formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with
        the laws of Singapore, and you agree that the Singapore courts shall have exclusive jurisdiction over all
        disputes relating thereto.].
      </p>
      <h2>18. CONTACT US</h2>
      <p>
        If you have any queries, feedback or complaints regarding any Platform, you may contact us by email at
        support@wavemall.io
      </p>
    </div>
  )
}
