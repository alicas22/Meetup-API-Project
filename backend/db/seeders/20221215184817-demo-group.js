'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name:"Beach Cities Parties & Cruises",
        about:`Our goal is to have meetups often and promote them well to ensure a great turnout and not just on Meetup but on Radio, TV and local Newspapers. With 300,000 singles over 35 in OC and 800,000 in LA/Valley, we have a goal for you to meet as many as possible. If you make a connection and slip out of the Singles Scene, then our we have done our job and only ask you to tell your friends where to meet classy Singles in OC and LA.

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
        city:'Las Vegas',
        state:'NV',

      },
      {
        organizerId: 2,
        name:"Dungeons and Dragons Party",
        about:`Have you ever read a book that has taken you to another place in your mind where you wish you were there physically? A movie that you loved so much that you see it over and over? Or perhaps heard a story that made a special connection to the world around you? These are some of the reasons why we love Dungeons & Dragons® so much and became Dungeon Masters. We get to create the universe and present it to the player. For some of us, Dungeons & Dragons® is a release and a kind of personal therapy. You see, Dungeons & Dragons® may be a game that one plays with some friends. But, for us, Dungeons & Dragons® provides a vehicle to express, share, create, and perform for the world. We bring excitement, happiness, and grand challenges to the players.

        If you never played before, this is the place where to find out what the fuss of Dungeons & Dragons® is all about. Roaming Dragon Games is the best place to get the guidance, support, and mentorship for this one-of-a-kind hobby that brings so much joy to people’s lives throughout the world. Suppose you have experience playing Dungeons & Dragons®. In that case, this is the place where you find that one Dungeon Master that you wish you had so many times when you played. The Dungeon Master gets you and opens the door of unlimited possibilities at the roleplaying table.
        Join us, have fun, be bold, be adventurous, be silly, and play Dungeons & Dragons® with us!!

        Professional Dungeon Masters roaming the land to find new cool places to play our passion role-playing game Dungeons & Dragons®!
        This is your opportunity to jump into a great Dungeons & Dragons® experience. We provide sessions throughout Orange County, Southern Los Angeles, and northern San Diego California. We also provide sessions worldwide online.
        We teach you everything you need to know, or if you have experience then this is what you’ve been waiting for!!

        We provide One-Shots (all levels) / Campaigns / and Private Tables
        All events are held either in person at one of our exciting breweries, bars, and lounge venues. As well as private parties and online`,
        type: "Online",
        private: true,
        city:'Notreal',
        state:'OH',
      },
      {
        organizerId: 3,
        name:"Grass VolleyBall",
        about:`Join us for Grass Volleyball events throughout Southern California (LA/OC/IE/SD).

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
        city:'Grass',
        state:'FL',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Party up in this hizzy', 'Nerd gathering for nerds', 'Pray for the Sinners'] }
    }, {});
  }
};
