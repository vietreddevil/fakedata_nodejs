var faker = require("faker");
var fs = require("fs");
var dirname1 = "F:/some setup/elastic/6.5.4/bin/fake/nested/";
var dirname2 = "F:/some setup/elastic/6.5.4/bin/fake/non_nested/";
(async function loop() {
  for (let i = 0; i < 1000; i++) {
    await new Promise(resolve => setTimeout(resolve, 1));
    (async function loop() {
      for (let j = 0; j < 1000; j++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        let temp_index_nested = { index: { _index: "fakedb_nested", _type: "data" } };
        let temp_index_non_nested = { index: { _index: "fakedb_non_nested", _type: "data" } };
        let data_nested = {
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
                    word_in_job: ""
                  }
                }
              }
            }
          }
        };
        let data_non_nested = {
          firstname: "",
          lastname: "",
          more_address_city: "",
          more_address_country: "",
          more_nest_nest1_nest11: "",
          more_nest_nest1_nest12_nest121: "",
          more_nest_nest1_nest12_nest122: "",
          more_nest_nest2_email: "",
          more_nest_nest2_username: "",
          more_nest_nest2_something: "",
          more_nest_nest2_phone: "",
          more_nest_nest2_job_company: "",
          more_nest_nest2_job_title_desc: "",
          more_nest_nest2_job_title_area: "",
          more_nest_nest2_job_title_wordnJob: "",
        };
        /*fake*/
        let firstname = faker.name.firstName();
        let lastname = faker.name.lastName();
        let city = faker.address.city();
        let country = faker.address.country();
        let paragraphs = faker.lorem.paragraphs(5);
        let sentence = faker.lorem.sentence();
        let sentences = faker.lorem.sentences();
        let email = faker.internet.email();
        let userName = faker.internet.userName();
        let titles =
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
        let phone = faker.phone.phoneNumber('0#########');
        let companyName = faker.company.companyName();
        let jobDescriptor = faker.name.jobDescriptor();
        let jobArea =
          faker.name.jobArea() + ", " + faker.name.jobArea();
        let words = faker.random.words(2000);
        //end fake
        //insert
        data_nested["firstname"] = firstname;
        data_nested["lastname"] = lastname;
        data_nested["more"]["address"]["city"] = city;
        data_nested["more"]["address"]["country"] = country;
        data_nested["more"]["nest"]["nest_1"]["nest_1_1"] =
          paragraphs;
        data_nested["more"]["nest"]["nest_1"]["nest_1_2"][
          "nest_1_2_1"
        ] = sentence;
        data_nested["more"]["nest"]["nest_1"]["nest_1_2"][
          "nest_1_2_2"
        ] = sentences;
        data_nested["more"]["nest"]["nest_2"]["email"] = email;
        data_nested["more"]["nest"]["nest_2"]["username"] = userName;
        data_nested["more"]["nest"]["nest_2"]["something"] = titles;
        data_nested["more"]["nest"]["nest_2"]["phone"] = phone;
        data_nested["more"]["nest"]["nest_2"]["job"][
          "company"
        ] = companyName;
        data_nested["more"]["nest"]["nest_2"]["job"]["title"][
          "desc"
        ] = jobDescriptor;
        data_nested["more"]["nest"]["nest_2"]["job"]["title"]["area"] = jobArea;
        data_nested["more"]["nest"]["nest_2"]["job"]["title"]["word_in_job"] = words;

        data_non_nested["firstname"] = firstname;
        data_non_nested["lastname"] = lastname;
        data_non_nested["more_address_city"] = city;
        data_non_nested["more_address_country"]  = country;
        data_non_nested["more_nest_nest1_nest11"] =  paragraphs;
        data_non_nested["more_nest_nest1_nest12_nest121"] = sentence;
        data_non_nested["more_nest_nest1_nest12_nest122"] = sentences;
        data_non_nested["more_nest_nest2_email"] =  email;
        data_non_nested["more_nest_nest2_username"] = userName;
        data_non_nested["more_nest_nest2_something"] =  titles;
        data_non_nested["more_nest_nest2_phone"] = phone;
        data_non_nested["more_nest_nest2_job_company"] = companyName;
        data_non_nested["more_nest_nest2_job_title_desc"] = jobDescriptor;
        data_non_nested["more_nest_nest2_job_title_area"] = jobArea;
        data_non_nested["more_nest_nest2_job_title_wordnJob"] =  words;
        //end insert


        //write to file
        let whole_nested =
          JSON.stringify(temp_index_nested) + "\n" + JSON.stringify(data_nested) + "\n";
        fs.appendFileSync(dirname1 + i + ".json", whole_nested);
        let whole_non_nested=
        JSON.stringify(temp_index_non_nested) + "\n" + JSON.stringify(data_non_nested) + "\n";
        fs.appendFileSync(dirname2 + i + ".json", whole_non_nested);
        //end write to file
      }
    })();
    console.log(i + "success!");
  }
})();