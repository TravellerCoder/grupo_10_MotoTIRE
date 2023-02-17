'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    
    await queryInterface.createTable('products',
      {
        id:{type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        model : Sequelize.STRING,
        brand_id: Sequelize.INTEGER,
        price : Sequelize.FLOAT,
        discount : Sequelize.INTEGER,
        description : Sequelize.TEXT,
        subDescription: Sequelize.TEXT,
        availability : Sequelize.INTEGER,
        category_id : Sequelize.INTEGER,
        img : Sequelize.STRING,
        subImg : Sequelize.STRING,
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
