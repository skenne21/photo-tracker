
exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(() => {
      return Promise.all([
        knex('photos').insert([
          {
            title: "Batman Back Baby",
            url: "https://i1.wp.com/www.caninomag.es/wp-content/uploads/2017/06/Adam-West-es-Batman-en-Canino-portada.png?resize=634%2C424&ssl=1"
          }, {
           title: "up to no good",
            url: "http://www.dovetailkennels.com/yahoo_site_admin/assets/images/1IMG_5574.255211006_std.JPG"
          }
        ])
    .then(() => console.log('Seeding done!'))
    .catch( error => console.log(`error seeding ${error}`))
    ])
  })
  .catch( error => console.log(`error seeding${error}`))
}
