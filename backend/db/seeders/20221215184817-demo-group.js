'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: "Beach Cities Parties & Cruises",
        about: `Our goal is to have meetups often and promote them well to ensure a great turnout and not just on Meetup but on Radio, TV and local Newspapers. With 300,000 singles over 35 in OC and 800,000 in LA/Valley, we have a goal for you to meet as many as possible. If you make a connection and slip out of the Singles Scene, then our we have done our job and only ask you to tell your friends where to meet classy Singles in OC and LA.

        Events to Expect from our Group:

        Cruises and International Travel. We post dozens of weekend and international trips to help you find someone to travel with & explore the world.

        Some of the events that will be featured in this group are:

        OC's Largest New Years Eve, Halloween Parties, & Pirate Parties in the Classiest Venues

        Meet n Greets at local bars, clubs, and lounges

        Happy Hours (Taco Tuesday, Happy Hump Day, Thirsty Thursday)

        Dance Parties

        Happy Hours

        Wine tasting

        Weekend Cruises to Ensenada and International Travel all over the world.

        If you are looking for some fun and adventure and are willing to leave your inhibitions at the door, this is the right group for you!

        If you ever need a quick update of what is next on the schedule, go to www.OCPartySingles.com (http://www.ocpartysingles.com/) . And remind your friends, you don’t need to be a member and there is never a charge to be a party of our groups, just a small admission for some of the parties to cover entertainment and venues charges.

        Deliver the best Singles dance parties every Sat to help you meet some of OC's classiest Singles.

        Join us for the next one and send your email to Sherri at DJSherriCA@gmail.com, to be on our Prime Member list so you don't miss any events or cruises.

        `,
        type: "In person",
        private: false,
        city: 'Las Vegas',
        state: 'NV',

      },
      {
        organizerId: 2,
        name: "Dungeons and Dragons Party",
        about: `Have you ever read a book that has taken you to another place in your mind where you wish you were there physically? A movie that you loved so much that you see it over and over? Or perhaps heard a story that made a special connection to the world around you? These are some of the reasons why we love Dungeons & Dragons® so much and became Dungeon Masters. We get to create the universe and present it to the player. For some of us, Dungeons & Dragons® is a release and a kind of personal therapy. You see, Dungeons & Dragons® may be a game that one plays with some friends. But, for us, Dungeons & Dragons® provides a vehicle to express, share, create, and perform for the world. We bring excitement, happiness, and grand challenges to the players.

        If you never played before, this is the place where to find out what the fuss of Dungeons & Dragons® is all about. Roaming Dragon Games is the best place to get the guidance, support, and mentorship for this one-of-a-kind hobby that brings so much joy to people’s lives throughout the world. Suppose you have experience playing Dungeons & Dragons®. In that case, this is the place where you find that one Dungeon Master that you wish you had so many times when you played. The Dungeon Master gets you and opens the door of unlimited possibilities at the roleplaying table.
        Join us, have fun, be bold, be adventurous, be silly, and play Dungeons & Dragons® with us!!

        Professional Dungeon Masters roaming the land to find new cool places to play our passion role-playing game Dungeons & Dragons®!
        This is your opportunity to jump into a great Dungeons & Dragons® experience. We provide sessions throughout Orange County, Southern Los Angeles, and northern San Diego California. We also provide sessions worldwide online.
        We teach you everything you need to know, or if you have experience then this is what you’ve been waiting for!!

        We provide One-Shots (all levels) / Campaigns / and Private Tables
        All events are held either in person at one of our exciting breweries, bars, and lounge venues. As well as private parties and online`,
        type: "Online",
        private: true,
        city: 'Chicago',
        state: 'IL',
      },
      {
        organizerId: 3,
        name: "Grass VolleyBall",
        about: `Join us for Grass Volleyball events throughout Southern California (LA/OC/IE/SD).

        In the past year, we have hosted grass volleyball games in Anaheim, Brea, Cerritos, Costa Mesa, Diamond Bar, Fullerton, Garden Grove, Irvine, Lake Forest, Los Angeles, Monrovia, North Hollywood, Newport Beach, Pasadena, Rosemead, San Diego, San Dimas, San Gabriel, Santa Ana, Torrance, Tustin, and Westminster.

        SoCal Grass Volleyball is open to volleyball players of all skill levels; however, different events may be designated for certain skill levels.

        Events may be held for:
        All Levels: Beginner Friendly,
        All Levels,
        Intermediate,
        Intermediate Plus,
        Intermediate to Advanced
        High Intermediate to Advanced
        Advanced

        Please check the specific event "Skill Level" before you are RSVP.

        NOVICE: Players are new to volleyball and may still be developing their skills to Serve, Pass, Set, and/or Hit the ball over the net consistently. They may also be learning the basic rules, players positions, and etiquette of volleyball.
        [Typical Experience: None, School PE, Recreational, w/ Friends & Family]

        HIGH BEGINNER: Players can accurately Serve, Pass, Set, and Hit the ball over the net at least 50% of the time AND understand and follow all the basic rules, player positions, and etiquette of volleyball.
        [Typical Experience: School PE, Recreational, Meetups]

        LOW INTERMEDIATE: Players can accurately Serve, Pass, Set, and Hit the ball over the net at least 60% of the time AND understand and follow all the basic rules, player positioning, defensive strategy, and etiquette of volleyball.
        [Typical Experience: Recreational, Meetups, Leagues]

        MID INTERMEDIATE: Players can Serve, Pass, and Set the ball with 70% accuracy and can regularly Spike the ball from above the net.
        [Typical Experience: Meetups, High School Team, Leagues]

        HIGH INTERMEDIATE: Players can Serve, Pass, and Set the ball with 80% accuracy and can regularly Spike the ball Down for a Kill.
        [Typical Experience: HS Varsity, Leagues, Tournaments, Collegiate]

        ADVANCED: Players can Serve, Pass, and Set the ball with 90% accuracy and can regularly Spike the ball Down and around Blocks for a Kill.
        [Typical Experience: Tournaments, Collegiate, D1]`,
        type: "In person",
        private: false,
        city: 'Grass',
        state: 'FL',
      },
      {
        organizerId: 4,
        name: "Dog Training Meetup",
        about: `The difference with our program is that we focus on the human and we don't complicate the dog training process. In this program you will learn how to have a loving and respectful relationship with your dog that goes both ways. This really is what sets our training apart from any other program you may have used before. If you don't have a healthy balance of Love and Respect with your dog then you probably don't have a complete relationship.
        If you need help establishing good conduct and curbing bad habits such as pulling on your walk, jumping on your guests and over- exuberance, enroll now! All breeds of dogs (3 months or older) may join this 8-week class. All basic obedience commands including Heel, Automatic Sit, Sit-Stay, Down-Stay, Distractions, Mastering the walk, Recall (Come!) will be covered. Certificates will be awarded at graduation.
        `,
        type: "In person",
        private: false,
        city: 'New York',
        state: 'NV',

      },
      {
        organizerId: 5,
        name: "Fun Friends for Adventure, Camping, Hiking, & Nature",
        about: `Hi.

        Thanks for checking out our group.

        A quick note to any who message(d) me - Meetup has a weird bug where anyone can email (me) an organizer, but if you're not a member of this group or another group we're mutually both in, then Meetup won't allow me to respond. It might be an anti-spam feature. So if anyone messaged me in the past, I'm sorry for not replying. I honestly tried, but Meetup's messaging system is strict. If anyone doesn't want to join this group, but has a question, try emailing me at wisejunkemail@gmail.com and I check that email account once a week.

        ***

        Do you love being outside in nature, going on adventures, discovering new places, making new friends, and creating new memories?

        Do you spend more time on social media than being social with real humans?

        Do your friends prefer staying indoors with the virtual world (phone, tv, movies, video games, internet, etc.) ?

        Or are your outdoorsy friends always busy?

        Is there a fun destination you want to go to, but haven't yet because nobody was available to join you?

        Are you bored of doing the same things and going to the same places every weekend?

        ***

        Well then, good news.

        Our group has many cool, friendly, and like-minded individuals.

        I plan a few events/trips throughout the year, and everyone is encouraged to host their own event.

        If there is a hike you want to do, a place you want to visit, or a trip/activity you want to plan...then share your idea so others can join you.

        ***

        FYI: Many people ask, so I'll mention it here. Wiseman sounds like a fake name, internet moniker, or nickname, but it's my real name. Ironically, I'm pretty dumb. ;)

        and under my main photo, click on "Tagged photos" and you can judge me...and decide if you want to join our group/events/trips. :)



        ***

        If anyone is brand new to camping, some of our trips are good for first-timers.

        ***

        For any dog-owners - as you know, many national & state parks prohibit dogs on hiking trails.

        However, our Eastern Sierra & Mammoth trips are dog friendly.

        Mammoth & Eastern Sierra are beautiful. Many trails allow dogs to run around and even jump/swim in lakes.

        So your dogs don't have to be sad or jealous when you go to national parks without them.

        Bring them on a fun camping trip!

        And let them chase squirrels!`,
        type: "Online",
        private: true,
        city: 'Denver',
        state: 'CO',

      },
      {
        organizerId: 6,
        name: "Meditation Group",
        about: `The BEST NON-DENOMINATIONAL GROUP MEDITATION SESSION Pranic Healing and Meditation With Daniel O'Hara Unity of Tustin It's nice to go to a quiet church and be able to give thanks to Buddha, Jesus and all other "sentient beings."

        It's nice to feel like no one religion is better than another, to sit around with a bunch of strangers and do a little laughing yoga before settling into a discursive meditation session. This is what Daniel O'Hara's Thursday-night meditations at Unity of Tustin are like. If the stars are out, then the group meditation might park itself outside, a trickling fountain echoing in the background. For an hour every week, O'Hara, a pranic (energy) healer, gathers his group and leads it through tunnels of light and bursts of color in an imaginative, ancient effort to shut out all that noise we ride around with in our cars every day. It works.

        After the meditation, O'Hara and a handful of other pranic healers provide free, short energy-cleansing sessions. Before you write it off as hokey, New Agey stuff, try it out. It's free. Afterward, you'll drive home feeling tingly and praising the Lord, Allah, the trees and O'Hara just the same. Every Thursday night we meet at 7:30pm for two or three dynamic and blissfully, powerful meditations. We have a dozen different Meditation Theme Nights that rotate. Each Theme night is synergistically designed to leave you empowered physically, emotionally, mentally and spiritually!

        THERE USUALLY ARE OVER 50 PEOPLE AT EACH EVENT. The event is by love offering and you'll learn new ways to increase your energy, improve your mental clarity, enhance your relationships and career.

        A friendly and welcoming atmosphere is waiting for you on Thursday evenings from 7:30 - 9:00pm at Unity Church in Tustin.

        See you at 14402 Prospect Avenue, Tustin, CA 92780. This group is not connected to the Unity Tustin Church, they kindly allow us to use their facilities. Come early and take a stroll through the powerful yet peaceful meditation gardens.

        You are sure to leave this group event with a wonderful calm energy surrounding you; energizing you for the week. Supercharge your spiritual growth with all the support you require.`,
        type: "In person",
        private: false,
        city: 'Berkeley',
        state: 'CA',
      },
      {
        organizerId: 7,
        name: "4X4 Off Road, Soft and Easy Explorers",
        about: `Looking for a group of folks who want to go overlanding and exploring the local areas (I myself am partial to old gold mines, ghost towns). We are not going to attempt anything too challenging on our everyday rigs. Easy and Moderate is the trail choice.
        My personal rig is a Tundra. It is lifted, has armor and has sliders along with AT tires and off road wheels,

        I want to ensure trips are geared so everyone who wants to get some off highway fun in without having to invest in a heavily modified 4WD. Goal is to have fun on a stress free trail. Easy on the driver and easy on our rigs.
        All brand of rigs are welcome. Trucks and SUVs. True 4x4s are what would be acceptable. Must have 4WD to wheel with us.

        All wheel drive cars, AWD, do not have enough ground clearance for a lot of the trails. Plus they cannot keep up with a regular 4WD rig. Sorry but best to run with similar AWD rigs in other Groups.

        Rigs are to be properly maintained with good tires, preferably off road type. A good spare, belts and hoses in good shape according to your owners manual. New or inexperienced drivers are encouraged to first ride with an experienced driver and learn the basics before taking their own rig on a trip.
        Some driver clinics are envisioned but to be scheduled.

        Each rig to be equipped with a tow strap, recovery hooks, working jack, tire plug repair kit and preferably a GMRS radio or hand held ham. Many of our trails are best if you "air down" for comfort and or traction.
        An Air compressor to be made available by leader on the trip. We will publish a full list of what a really well equipped rig typically carries in the future.

        AS OF JUNE 2021, WE ARE CO-AFFILIATED WITH:
        WESTERN TRAILS WILDERNESS CAMPING.
        Check them out for multi day trips and many out of state opportunities to wheel.

        `,
        type: "In person",
        private: false,
        city: 'Moab',
        state: 'UT',

      },
      {
        organizerId: 8,
        name: "Dance Lab: Celebrating motion of letting dance dance you",
        about: `We been able to find a dance center and have not offered dance classes in awhile (below curriculum outlined) and instead are only offering "Dance of Life Energy" as forms of Tai Chi / Qigong all outdoors at our park locations.

        Original Dance Program: The Dance Lab is an improv to finding your wild side. Whether a single dancer or with a partner, their are no rules in the Lab. This safe environment offers a unique revered way to celebrate awareness through movement. Finding your energy playground and exploring your experience into an energy canvas opens up rich sensual forms. Watch yourself evolve through fearless leaps and into a burst of natural energy expression. Effortlessly find your own pace to creating a gentle or rigorous connection that will transform into powerful healing.`,
        type: "In person",
        private: true,
        city: 'Notreal',
        state: 'OH',
      },
      {
        organizerId: 9,
        name: "Desert Healing Soundbath Spiral Cacao Fire Ceremony",
        about: `Hello -
        I received a message about this group needed an organizer so I decided to accept. It makes sense because I am already the organizer of a similar but not identical group called Sound Healing Journeys and Conscious Concerts. We do our own version of guided meditation/sound bath type experiences. One thing that sets us apart from the typical crystal bowl/gong ceremony is that we are professional musicians with a nice repertoire of medicine music and we follow up our sound healing ceremonies with a lovely concert of hi vibe songs. Please stay tuned here for details of upcoming events. Our next one is January 29 2023. I am leaving intact the below description of the previous group out of respect, at least for now. Please visit Sound Healing Journeys and Conscious Concerts, LionsofLyra.com and youtube.com/lionsoflyra for more info about what we do.

        Desert Soundbath, Spiral Healing, Cacao + Fire Ceremony

        Come back to the roots of Mother Earth sacred space filled with vibrations and sound. Here in the heart of the dessert you can find peace and solitude.

        Join us for Energy Healing /Spiral Activation journey and dive into the sound of gongs therapeutic bowls and other healing instruments. Sit by the fire with us and immerse into the the grounding power of cacao.

        This is a very special edition of healing ceremony with a possible overnight camping in the desert (more info in email) We will gather to create a small community enjoying our connection with Mother Nature. We are really excited about this project which we hope will take place regularly.

        WHAT TO EXPECT:

        We will gather by the fire and do grounding Cacao Ceremony first. Then we will be guided on a Spiral Healing to connect to the universal love frequency and Sound Healing.
        Sound bath will last 60 min or a bit longer. Please don't be late and come 30 min earlier to find your spot and set up.
        We'll stay longer to chat by the fire some of us are camping overnight nearby to hike next day :)
        HOW TO PREPARE:

        4x4 wheel VEHICLE REQUIRED
        or leave the car on a parking nearby and walk.

        Please bring your own mat blanket eye cover and a pillow to feel as comfortable as you need.
        Drink lots of water or herbal tea before and after the sound bath. Try to eat light meals that day.
        NO meditation or yoga experience is required.
        You can bring more firewood with you.
        This is a voluntary donations only event. No tickets are required. Donations will support purchase of cacao
        Registration is mandatory to participate and get directions
        Exact directions and place will be given by email after rsvp or donating
        Please don't bring fur or any animal derived food to the gallery this is a cruelty free space we care a lot about human and nonhuman animals as well as the environment and Mother Earth.
        Camping optional`,
        type: "In person",
        private: false,
        city: 'San Marcos',
        state: 'TX',
      },
      {
        organizerId: 10,
        name: "Let's Watch Movies Together",
        about: `Our movie watching group is a community of film enthusiasts who are passionate about exploring the world of cinema. We believe that movies are a powerful medium that can inspire, educate, and entertain us, and we want to share this experience with like-minded individuals. Whether you're a seasoned cinephile or a casual moviegoer, our group is open to all who love movies and want to discover new perspectives and stories.

        We organize regular movie screenings, both in theaters and online, where we watch and discuss a wide range of films from different genres, eras, and countries. Our movie nights are not just about watching movies but also about creating a welcoming and inclusive environment where members can connect, socialize, and exchange ideas. We encourage everyone to share their opinions and insights, and we value diversity of thought and perspective.

        In addition to movie nights, we also host special events such as film festivals, guest speakers, and movie trivia nights. Our events are designed to broaden our members' horizons and deepen their appreciation of cinema. We also collaborate with other movie groups and organizations in the community to create a larger network of movie lovers and filmmakers.

        Our movie group is not just about watching movies but also about creating a sense of community and belonging. We believe that movies have the power to bring people together and foster empathy and understanding. Through our events and discussions, we aim to promote open-mindedness, critical thinking, and creativity.

        Joining our movie group is a great way to meet new people, expand your movie knowledge, and have fun. We welcome everyone who shares our passion for movies and who wants to explore the world of cinema with us. Whether you're interested in classic movies, independent films, or the latest blockbusters, we have something for everyone. Come and join us, and let's watch some great movies together!`,
        type: "In person",
        private: false,
        city: 'Pawnee',
        state: 'IN',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Let's Watch Movies Together", 'Desert Healing Soundbath Spiral Cacao Fire Ceremony',
      'Dance Lab: Celebrating motion of letting dance dance you', "4X4 Off Road, Soft and Easy Explorers",
      "Meditation Group","Fun Friends for Adventure, Camping, Hiking, & Nature",  "Dog Training Meetup",
      "Grass VolleyBall", "Dungeons and Dragons Party", "Beach Cities Parties & Cruises"] }
    }, {});
  }
};
