'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkInsert(options, [
      {
        venueId:1,
        groupId: 1,
        name:"MORNING MUAY THAI (LONG BEACH, CA)",
        description:`Hanuman Muay Thai is FREE training for the community. In Thailand, as well as many other parts of the world, "Hanuman" signifies bravery, courage, strength, perseverance and devotion.

        This is a WTBA associated club and certified rankings will be given as each student progresses. This program is geared towards beginners. No experience necessary. No judgement, only friends. Come on down, have fun and discover the art of eight limbs.

        RSVP by 7:00 PM one day before training. Send a text message to Tara, +1 (949) 522-0396

        SCHEDULES & VENUES

        MONDAYS @ 7:00 AM, Juarez Park, 841 S. Sunkist Street, Anaheim, CA 92806

        SATURDAYS @ 7:00 AM, Shiffer Park, 3143 Bear Street, Costa Mesa, CA 92626. We meet at basketball and handball courts. Optional team breakfast following the last Saturday training of each month.

        SUNDAYS @ 7:00 AM, Marina Vista Park, 5355 East Elliot Street, Long Beach, CA 90803.

        MEET UP DATES/TIMES ARE ALWAYS TENTATIVE. THIS CALENDAR IS AUTOMATICALLY RENEWED WEEKLY/MONTHLY/EVERY TWO WEEKS. MEET UP EVENTS MAY BE CANCELLED DUE TO HOLIDAYS AND SCHEDULE CONFLICTS. THIS MEETUP EVENT IS FOR INFO ONLY, NOT A TICKETING OR PAYMENT PORTAL. UPDATED 1:04 PM 1/16/2022`,
        type: "In person",
        capacity:3000,
        price: 10,
        startDate:new Date("2023-11-6"),
        endDate: new Date("2023-11-6")
      },
      {
        venueId:2,
        groupId:2,
        name: "Dungeons and Dragons Session 0 (The Tale of the Ever Loved Bard)",
        description:`Hello all in the Glendora Area! I am wanting to get a group together for game either online or in person. This night would be online. We would talk about expectations and what D&D, would love to get to know some people and play a table top rpg! The first event is free but the others are payed session. The limit is High just incase we can make multiple groups!

        Hello all in the Glendora Area! I am wanting to get a group together for game either online or in person. This night would be online. We would talk about expectations and what D&D, would love to get to know some people and play a table top rpg! The first event is free but the others are payed session. The limit is High just incase we can make multiple groups!`,
        type: "Online",
        capacity: 100,
        price:1,
        startDate:new Date("2023-12-31"),
        endDate: new Date("2024-01-01")
      },
      {
        venueId:3,
        groupId:3,
        name: "4v4 Adult Coed Beach Volleyball League in Long Beach - REGISTER TODAY!",
        description:`4v4 Adult Coed Beach Volleyball League in Long Beach!



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
        type:"In person",
        capacity:300,
        price:50,
        startDate: new Date("2024-6-13"),
        endDate: new Date("2024-6-14")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['March for Freedom', 'Knitting for Grannies', 'Eat a Whole Cow'] }
    }, {});
  }
};
