var faker = require("faker");
var fs = require("fs");
var dirname = "F:/some setup/elastic/6.5.4/bin/fake/";
(async function loop() {
  for (let i = 0; i < 4000; i++) {
    await new Promise(resolve => setTimeout(resolve, 1));
    (async function loop() {
      for (let j = 0; j < 1000; j++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        let temp_index = { index: { _index: "fakedb", _type: "data" } };
        let data = {
          firstname: "",
          lastname: "",
          more: {
            address: {
              city: "",
              country: ""
            },
            nest: {
              nest_1: {
                nest_1_1: "",
                nest_1_2: {
                  nest_1_2_1: "",
                  nest_1_2_2: ""
                }
              },
              nest_2: {
                email: "",
                username: "",
                something: "",
                phone: "",
                job: {
                  company: "",
                  title: {
                    desc: "",
                    area: "",
                    word_in_job:""
                  }
                }
              }
            }
          }
        };

        data["firstname"] = faker.name.firstName();
        data["lastname"] = faker.name.lastName();
        data["more"]["address"]["city"] = faker.address.city();
        data["more"]["address"]["country"] = faker.address.country();
        data["more"]["nest"]["nest_1"]["nest_1_1"] =
          faker.lorem.paragraphs(5);
        data["more"]["nest"]["nest_1"]["nest_1_2"][
          "nest_1_2_1"
        ] = faker.lorem.sentence();
        data["more"]["nest"]["nest_1"]["nest_1_2"][
          "nest_1_2_2"
        ] = faker.lorem.sentences();
        data["more"]["nest"]["nest_2"]["email"] = faker.internet.email();
        data["more"]["nest"]["nest_2"]["username"] = faker.internet.userName();
        data["more"]["nest"]["nest_2"]["something"] =
          faker.name.title() +
          ", " +
          faker.name.title() +
          ", " +
          faker.name.title() +
          ", " +
          faker.name.title() +
          ", " +
          faker.name.title() +
          ", " +
          faker.name.title() +
          ", " +
          faker.name.title() +
          ", " +
          faker.name.title();
        data["more"]["nest"]["nest_2"]["job"][
          "company"
        ] = faker.company.companyName();
        data["more"]["nest"]["nest_2"]["job"]["title"][
          "desc"
        ] = faker.name.jobDescriptor();
        data["more"]["nest"]["nest_2"]["job"]["title"]["area"] =
          faker.name.jobArea() + ", " + faker.name.jobArea();
          data["more"]["nest"]["nest_2"]["job"]["title"]["word_in_job"] = faker.random.words(1000);
        let whole =
          JSON.stringify(temp_index) + "\n" + JSON.stringify(data) + "\n";
        fs.appendFileSync(dirname + i + ".json", whole);
      }
    })();
    console.log(i + "success!");
  }
})();
