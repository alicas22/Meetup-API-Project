'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkInsert(options, [
      {//1
        venueId: 1,
        groupId: 1,
        name: "MORNING MUAY THAI (LONG BEACH, CA)",
        description: `Hanuman Muay Thai is FREE training for the community. In Thailand, as well as many other parts of the world, "Hanuman" signifies bravery, courage, strength, perseverance and devotion.

        This is a WTBA associated club and certified rankings will be given as each student progresses. This program is geared towards beginners. No experience necessary. No judgement, only friends. Come on down, have fun and discover the art of eight limbs.

        RSVP by 7:00 PM one day before training. Send a text message to Tara, +1 (949) 522-0396

        SCHEDULES & VENUES

        MONDAYS @ 7:00 AM, Juarez Park, 841 S. Sunkist Street, Anaheim, CA 92806

        SATURDAYS @ 7:00 AM, Shiffer Park, 3143 Bear Street, Costa Mesa, CA 92626. We meet at basketball and handball courts. Optional team breakfast following the last Saturday training of each month.

        SUNDAYS @ 7:00 AM, Marina Vista Park, 5355 East Elliot Street, Long Beach, CA 90803.

        MEET UP DATES/TIMES ARE ALWAYS TENTATIVE. THIS CALENDAR IS AUTOMATICALLY RENEWED WEEKLY/MONTHLY/EVERY TWO WEEKS. MEET UP EVENTS MAY BE CANCELLED DUE TO HOLIDAYS AND SCHEDULE CONFLICTS. THIS MEETUP EVENT IS FOR INFO ONLY, NOT A TICKETING OR PAYMENT PORTAL. UPDATED 1:04 PM 1/16/2022`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//2
        venueId: 1,
        groupId: 1,
        name: "Soccer on the Beach",
        description: `I am organizing a friendly lunchtime soccer group. All skill levels are welcome. The aim is to get ~1hr of soccer time. Please RSVP to gauge interest.

        Just bring some cleats and a ball (if you have one). Nothing formal. Just trying to get a good sweat in.

        Everyone is welcome to join`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//3
        venueId: 1,
        groupId: 1,
        name: "Sand Volleyball, Fun for Everyone!",
        description: `We welcome intermediate and advanced players to join us playing beach volleyball on Wednesday and Friday mornings at 10am at Mother's Beach in Long Beach. We play 2's, 3's and 4's depending on how many players we have.`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//4
        venueId: 2,
        groupId: 2,
        name: "New Dungeons and Dragons campaign looking for players",
        description: `Greetings gamers. Your host has generously permitted me to post this message seeking players for a new D&D campaign using Ruins of Symbaroum for 5e:

        https://www.symbaroum.com/

        We hope to start playing in April or early May. The first session is tentatively planned for Saturday, April 15th, at 1 pm. This in-person game will meet at my place in Orange County, and we plan to play about every four weeks. I'm in my fifties, as is a friend in LA who will be one of the players—so, looking for either older players or those who don't mind playing with some old dudes. We will lean into the setting's gritty, dark fantasy/low magic nature, and there will be a mix of role-playing, politics, and combat. The characters will be focused on military-type missions (à la the Black Company books by Glen Cook). The first 1-2 sessions will allow you to try the game before committing to play in the ongoing campaign.

        Please contact me if you are interested or have advice for finding players. Thank you.`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//5
        venueId: 3,
        groupId: 2,
        name: "D&D 5e: Theros; Against the Cult of the Reptile God [Table Full]",
        description: `Session Overview:
        Session Zero's consist of the group getting to know one another, discussing the shared ground rules/team approach, as well as building characters together. The session will also include some prologue roleplaying/storytelling to get things going!

        Campaign Overview:
        Theros is the land of great and mighty heroes, capricious gods, and extraordinary tales. For this Odyssey, I invite you to step into a living, breathing world of brilliant culture, fate, and heroism. With Xenagos defeated, Elspeth betrayed by Heliod, and the return of Klothys, Theros is in dire need of those who will fill the gap and save the realms from its own destruction.

        This adventure will comprise of new and old experiences: we will begin with a Prologue, a means of introducing characters into the vibrant world of Theros and their roles to play in the battlegrounds of the Poleis, the Wilds, and even Nyx itself. Once properly introduced, our adventure will segue into an updated rendition of Against the Cult of the Reptile God, a level 1-3 adventure from classic Advanced Dungeons and Dragons. Beyond this, various adventures included in the Mythic Odysseys of Theros sourcebook, as well as converted adventures from books such as Ghosts of Saltmarsh will be converted into Theros to ensure continued excitement and intrigue. The odyssey shall continue as long as the stories need to be told!`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//6
        venueId: 3,
        groupId: 2,
        name: "Dungeons and Dragons Session 0 (The Tale of the Ever Loved Bard)",
        description: `Hello all in the Glendora Area! I am wanting to get a group together for game either online or in person. This night would be online. We would talk about expectations and what D&D, would love to get to know some people and play a table top rpg! The first event is free but the others are payed session. The limit is High just incase we can make multiple groups!

        Hello all in the Glendora Area! I am wanting to get a group together for game either online or in person. This night would be online. We would talk about expectations and what D&D, would love to get to know some people and play a table top rpg! The first event is free but the others are payed session. The limit is High just incase we can make multiple groups!`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//7
        venueId: 1,
        groupId: 3,
        name: "4v4 Adult Coed Beach Volleyball League in Long Beach - REGISTER TODAY!",
        description: `4v4 Adult Coed Beach Volleyball League in Long Beach!



        • Advanced Coaching Sessions available for schedule
        • 7 Weeks of League Games plus a Playoff Week
        • Games are played Saturday Mornings (between 9am- 1pm) on the sand in Belmont Shore
        • 4v4 Adult Coed (3-4 players on the court at a time - at least 1 female player)
        • Sign up as an Individual (Free Agent) or a Team (min 5 players/team)
        • Beginner/Intermediate Skill Level Players
        • Dri-Fit League Shirt
        • Side contests, Prizes, Giveaways
        • New Friends, and Much More!
        • Registration Fee: $79


        Our Leagues Enjoy:

        • DJ Sound System at Fields!
        • Snacks and Drinks Weekly
        • Private Parties at Alfredo's
        • Sponsor Bar Specials After Games
        • Multi-Sport Vacation Trips
        • League Social Events & Adventures
        • Professional Photography & Video

        Teams play every Saturday Morning 9am-1pm on the sand @ Covina Ave & Ocean Blvd in Belmont Shore. This Season we have some Excellent Sponsors on board to bring even more Fun & Excitement to the Sand!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//8
        venueId: 2,
        groupId: 3,
        name: "Competitive Grass Volleyball",
        description: `Intermediate to advanced volleyball players ONLY!

        Competitive Grass Volleyball is being Hosted on SoCal Grass Volleyball. https://www.meetup.com/socal-grass-volleyball/

        Serve! Bump! Set! Spike! Repeat!

        PLAYERS: Players must be at an Intermediate and/or above skill level, meaning that you can Serve, Pass, Set, and Hit the ball over the net ACCURATELY AT LEAST 60% of the time AND you know and FOLLOW all of the basic rules and etiquette of volleyball. Failure to meet this standard may result in your dismissal.

        SKILL LEVELS: A fuller description of player skill levels can be found on the "About" page of Irvine Grass Volleyball.

        RSVP: You must be listed as "Going" on the RSVP list to play. If you signup for an event, but are then unable to attend, please be courteous and change your RSVP to "Not Going" so that someone on the Waitlist can attend.

        WAITLIST: Joining the Waitlist does not guarantee you a spot to play. Players will be added to the "Going" list based on a few factors, including whether one or two nets will be set up that week, reliability of attendance, and balance of players.

        CANCELLATIONS: If you develop a pattern of RSVPing and then cancelling (for example, you cancel more often than you attend), you may automatically be moved to "Not Going" to allow other players, who want to play and show up consistently, a spot to play on Sunday.

        NO SHOWS: Two "No Shows" and you will be removed from the group!

        SAFETY: No collisions with players (on your own team or under net).

        TEAMMATES: Volleyball is a team sport. Players are expected to know their position on the court and be aware of their fellow teammates positioning. Players should not be passing/setting/hitting/spiking their teammates ball and/or lunging for every ball simply because it is within their reach.

        FUN: No Arguments! If there is a questionable play, we will do it over.

        FAULTS: Let players call their own faults (unless egregious)! BE KIND!

        SCORING: Games to 25! Rally scoring. Win by two.

        SERVES: Let serves are good. No attacking the serve above the net.

        NETS: Touching the net is a fault unless the net is pushed into you.

        DINKS: In games of 2s, 3s, and 4s, Open hand dinks/tips will not be allowed. You must strike the ball or roll it off of your hand.

        BLOCKS: Touching the block will not count as one of the three contacts. The blocker can re-hit the ball.

        LEGAL HITS: The ball can be played with all parts of the body.

        SETTING: Intentionally setting the ball over the net must be in the direction the player is facing (forward or backwards). Accidental oversets are not a fault.

        ROTATION: Teams of Four or more players must use a standard rotation where by all players rotate through each position. The serve must come from a backrow player. Backrow players cannot attack the ball from above the net past the ten foot line.

        ANTENNAS: No antennas, so the ball must cross the net between the poles.

        PARK RULES: We are guests at the park. Please abide by all of the rules of the park posted by the city of Irvine.

        BATHROOMS: Public bathrooms are available next to the playground.

        MUSIC: Please do not bring your music; everyone has different tastes.

        *** DISCLAIMER of RISK and LIABILITY ***

        The Group Organizer and assistant organizers assume no liability; participate at your own risk.

        You, and no one else, are 100% responsible for your safety at all times.`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//9
        venueId: 3,
        groupId: 4,
        name: "WHAT'S YOUR DOG TYPE FREE MIXER (DOGS WELCOME)",
        description: `Join us for a Dog Type and Friends Singles Mixer on Sunday, April 2nd, 2pm at Woodcrest Park: Orangethorpe and Richman in Fullerton (meet by the basketball courts). Bring your dog and come prepared to socialize and mingle with your fellow single dog lovers. Attendance is free, and we look forward to meet your dog (and you, too). See you soon!`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//10
        venueId: 1,
        groupId: 4,
        name: `10 Min Workout "Pup Pilates: How to workout with your dog" + Live Chat`,
        description: `Some of the real benefits of group exercise are: 1) You can get more bang for your buck; 2) There's camaraderie between participants; 3) It's great for everyone - whatever their fitness level; 4) You don't have to know what you are doing.

        Therefore, the 10-min Doggie Pilates has become our weekly event. Make a stamp card for your health and your dog bonding time, give it a paw print every time you guys join us. Also, don't hesitate to say hi using the live chat box in the screening room.

        How to join: At the event time, go to https://w2g.tv/x8rac43l78z0k1lout (Copy and paste it)

        Stay Safe, Stay Well, and Stay CONNECTED!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//11
        venueId: 2,
        groupId: 5,
        name: "Strawberry Peak Hike via Redbox Canyon",
        description: `Come join the next Peak Bagger hike, Saturday morning, 3/18/23. Meet bright and early to hike approximately 7 miles to the top!

        This should be a really fun hike with slightly wintery, but safe conditions to enjoy the scenery.

        We'll travel the Strawberry Peak Trail via Redbox Canyon.

        This is a hike at your own pace and hopefully, there will be small groups for those who like to hike faster and also those who like a more casual pace.

        Alltrails: https://www.alltrails.com/trail/us/california/strawberry-peak-trail-via-redbox-canyon
        Parking: Red Box Picnic Area
        Hiking Guy has a bunch of info if you'd like to read more here: https://hikingguy.com/hiking-trails/best-la-hikes/strawberry-peak-hike/

        **Disclaimer: this meetup is only intended to help meet, coordinate and motivate those who want to do the 6 Pack of Peaks challenge. Please be safe and hike at your own risk and be prepared with hiking essentials.**`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//12
        venueId: 3,
        groupId: 5,
        name: "Earth Day Celebration Hike.. Bugs with wings and legs",
        description: `This moderate hike from the Arroyo Pescadero Trailhead will be conducted by John Peel. John grew up in Whittier and has been hiking and biking in the preserve area for over forty years. He's not only a docent for the Habitat Authority but also the L.A. Zoo and has extensive knowledge relevant to most of the species that call our preserve home. Please feel free to join him on this hike which should prove to be most interesting and informative.

        Remember to bring plenty of water. In the event of rain, check the Habitat Authority Website to ensure the trails are open (https://www.habitatauthority.org) . If so, the hike will take place.
        See you there!!!!`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//13
        venueId: 1,
        groupId: 6,
        name: "Inspirational Meditation",
        description: `Awaken and uplift your mind with readings for your daily dose of inspiration, motivation, and fulfillment in life. Our Inspirational Meditation session starts with a discussion on words of wisdom from great poets, philosophers, writers, scriptures, sages, saints, scientists, and even song writers.
        Bring your morning tea or coffee and share your favorite writings, experiences, questions, or enlightenments with the group. Or sit back, listen, and enjoy as we find words to connect with the wisdom of the universe and shed light on our day.
        After the readings and discussion, we will explain our meditation method and completely relax with a short guided meditation. Lighten your mind and let all that inspiration and wisdom soak in.
        Leave the conversation with renewed optimism and a broader perspective, as part our Inspirational Meditation family. It's a great way to start your day!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//14
        venueId: 2,
        groupId: 6,
        name: "Kids Meditation",
        description: `How can I help my child focus? How can I help my child manage emotions like stress and anxiety? Can my kids learn meditation? These are questions parents often ask us. As parents, we want to do our best to help our children, but we don't have all the answers.
        Discover how meditation can help your child manage emotions, focus better, lessen everyday stress and anxiety, and even sleep better. We will introduce your child to a simple guided meditation that will help them to overcome challenges and become truly happy, self-confident, and compassionate individuals.
        A few comments our kids use to describe the meditation are “fun,” “refreshing,” and “light.” They say they “feel calmer, happier, more focused, and less selfish.” Even parents tell us how much they enjoy being in the class with their children.
        Give your children the tools they need to have a deeper understanding of themselves and enjoy a happy, and healthy life.
        Join us! Our program is interactive and fun. Make new friends! Turn this time of isolation into an opportunity to strengthen your child's well-being.

        Every Sunday at 12pm PST`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//15
        venueId: 3,
        groupId: 7,
        name: "Christmas tree pass to Lake Mohave. Beach lunch and then head home.",
        description: `Time for lunch on the beach. This will be a full day run out to lake Mohave by route of Christmas Tree pass. Bring plenty to drink, snacks and a lunch for the lake. It will be in the 80'S - 90'S bring your chairs for the beach. We will be passing an old quarry in the canyon. We can stop there for a snack. This trail is rarely traveled anymore, but the original road is still in great shape for as old as it is and the amount of travel it gets.

        2 TRACK ROAD ALL THE WAY. YOU MAY USE SOME 4 WHEEL DRIVE IN THE SAND, NO ROCKS.

        Well met at 9 am at Home Depot in Bullhead. Be on time we'll wait 10-15 min and then were off. It's a full day so try and be on time.`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//16
        venueId: 1,
        groupId: 7,
        name: "Moab Saturday Moab Rim",
        description: `I will be on the Moab Rim with the Red Rock 4-Wheelers.
        If you want to attend this trail you will need to register and pay with RR4D.
        https://www.rr4w.com/event-registration.cfm?eventid=27
        Hope to see you guys there.`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//17
        venueId: 2,
        groupId: 8,
        name: "Disco dancing lesson and open dance monthly",
        description: `Join us for a fun-filled evening of disco dancing at our monthly event! Our dance lesson will cover all the basics of disco dancing, and our experienced instructors will guide you through each step. After the lesson, the dance floor will be open for you to practice your moves and dance the night away to your favorite disco hits. Whether you're a seasoned dancer or new to disco, this event is the perfect opportunity to get your groove on and have a great time with friends. Don't miss out on the fun - come join us for our monthly disco dancing lesson and open dance!`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//18
        venueId: 3,
        groupId: 8,
        name: "SATURDAY NIGHT DANCE",
        description: `Don't be foolish (; and join us Saturday night for some fun! Don't worry we won't trick you this April fools! Come and dance to some great hits from the 70s, 80s, 90s and 00s. Turn up the heat at the Hilton Hotel in Irvine and bring your dancing shoes! With our own private ballroom and private bar, get ready to have a great night dancing and mingling with other people. Whether you are single, a couple, a group of friends, or family we are welcome and open to all!! Come and have a great time!
        "We're fools whether we dance or not, so we might as well dance."
        DETAILS BELOW:
        DATE/ TIME: SATURDAY APRIL 1ST 7PM-12AM
        LOCATION: HILTON HOTEL
        18800 MACARTHUR BLVD IRVINE, CA
        TICKETS: $20 CASH ONLY
        PARKING: $10 WITH LEMONDROP DISCOUNT
        DRINKS: PRIVATE BAR`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//19
        venueId: 1,
        groupId: 9,
        name: "Desert Home Companion",
        description: `An evening of FREE live entertainment right in your own home!

        Come listen to short stories, music, and other goodies from your favorite authors and local writers.

        Authors/presenters - please contact us at least two days in advance to reserve a spot. Same for readers who have a reading from a favorite author they'd like to share.

        Please try to arrive at least five minutes before 7. The show starts promptly at 7!

        To get the link for the meeting, please RSVP.

        If you have friends who would like to attend from their own homes and they aren't members of this meetup, ask them to join the meetup or else they can contact us for information.`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {//20
        venueId: 2,
        groupId: 9,
        name: "Desert Toasters - Toastmasters",
        description: `Participate in Toastmasters' proven program, where you'll learn how to speak comfortably in front of a group and lead with purpose. People who join Toastmasters find potential they never thought they had and achieve more of their goals and dreams.

        Join Zoom Meeting
        https://us02web.zoom.us/j/89752054606?pwd=RS9FVkh1cE05RzI4by9pTGtvZjRjUT09

        Meeting ID: 897 5205 4606
        Passcode: 592824`,
        type: "Online",
        capacity: 100,
        price: 1,
        startDate: new Date("2024-07-05T15:45:00"),
        endDate: new Date("2024-07-05T17:15:00")
      },
      {//21
        venueId: 3,
        groupId: 10,
        name: "Saturday Night at the Movies",
        description: `SERIOUSLY SATURDAY NIGHT AT THE MOVIES

        Let's raise our intellects while we raise our glasses. We'll trade insights during the post-film discussion, as we explore mind-expanding documentaries and thought-provoking films.

        HOW DOES THIS WORK? We open at 4:45 PT for a little meet & greet, then at 5:00 we 'go dark' (turn off our Zoom mics and cameras) and view the film on our individual TV's, computers, or other devices. 5-10 minutes after the movie ends (to allow for a trip to the fridge, phone call, or call of nature), we return to Zoom, turn on our mics and cameras, and begin the discussion. Of course you can watch the film ahead of time, if you prefer.

        THIS WEEK
        Casino, Directed by Martin Scorsese, Part 2
        1 hr 30 min (this is the second half of this 3-hr film, last week we watched the first half))

        Check the link below, to see which streaming services offer this film.
        https://www.justwatch.com/us/movie/casino

        “In the casino, the cardinal rule is to keep them playing and to keep them coming back. The longer they play, the more they lose, and in the end, we get it all.”

        Five years after his gangland masterpiece GoodFellas, Martin Scorsese reunited with writer Nicholas Pileggi and stars Robert De Niro and Joe Pesci for Casino (1995), an even more ambitious mob epic of organized crime in 1970s Las Vegas. De Niro is ace oddsmaker Sam “Ace” Rothstein, a gambling genius and perfectionist sent to turn the Tangiers into a cash machine for the Midwest mob and Pesci is his boyhood pal, a nitroglycerin-primed enforcer who moves into Vegas just as the gaming officials start to crack down on organized crime.
        Sharon Stone earned an Oscar nomination as Rothstein's weakness, the gambling-obsessed beauty Ginger whose heart belongs to a snaky lowlife (James Woods) even as she marries the pathologically jealous Rothstein. Don Rickles provides understated and admirable back-up as Rothstein's right-hand man and Alan King, Kevin Pollak, L.Q. Jones, Dick Smothers, and Frank Vincent co-star.

        Scorsese spends the first half of the sprawling three-hour epic laying out the entire operation in fascinating detail—it's not simply exposition, it's the ultimate how-to as a thrilling piece of cinematic gamesmanship—and last half watching it all unravel through greed, arrogance, hubris, and the unleashed, monstrous id of Pesci's blood simple thug, right through to the clean-up as the mob ruthlessly eliminates loose ends. It's amazingly deft for such an epic portrait and Scorsese's ambition has the tendency to get the better of the film, which is almost too busy for its own good. Almost.`,
        type: "In person",
        capacity: 300,
        price: 50,
        startDate: new Date("2024-07-10T18:00:00"),
        endDate: new Date("2024-07-10T19:30:00")
      },
      {//22
        venueId: 1,
        groupId: 10,
        name: "Weekly Movie Night!",
        description: `Greetings, horror fans! Let's get online and watch movies together! We'll have a voice chat set up in the MHH Discord server, and the host (myself or someone else) will share their screen and stream something scary for our viewing pleasure.

        For now, we'll keep it casual and create a list of titles as a group for me to choose from. We can watch a movie, a few episodes of a series, or maybe there's something else you think we should see.

        The feature presentation will start at 7pm, but I'll be on at 6:30pm for pre-movie chat and cocktails. We'll meet in the "MHH Theater 1" voice channel under "Thursday Movie Nights."

        --DISCORD??--

        If you don't already have a Discord account, you can get one here: https://discord.com/. It's free!

        The event link is an invite link to our server. It should not expire. If you have any problems with getting Discord to work, send me a message and I'll see what I can do.

        We have text chat channels and voice chat channels set up. Voice channels allow participants to share their screens or use video chat. I've had fun movie and game nights with my friends and family on Discord, and I'm looking forward to hanging out with all of you again. :D`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      venueId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
