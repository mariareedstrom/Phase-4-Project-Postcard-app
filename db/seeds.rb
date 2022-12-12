# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
puts "🌱 Seeding your postcards..."
#clean-up before seeding
Postcard.destroy_all
Destination.destroy_all
User.destroy_all
Comment.destroy_all

#Creating users
bob = User.create(name: "Bob", username: "bob@email.com", password: "bobpassword", picture: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1600")
erik = User.create(name: "Erik", username: "erik@email.com", password: "erikpassword", picture: "https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1600")
maria = User.create(name: "Maria", username: "maria@email.com", password: "mariapassword", picture: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1600")
liam = User.create(name: "Liam R", username: "liam@email.com", password: "liampassword", picture: "https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?auto=compress&cs=tinysrgb&w=1600")
sonder = User.create(name: "Sonder", username: "sonder@email.com", password: "sonderpassword", picture: "https://images.pexels.com/photos/5732456/pexels-photo-5732456.jpeg?auto=compress&cs=tinysrgb&w=1600")
bill = User.create(name: "Bill", username: "bill@email.com", password: "billpassword", picture: "https://images.pexels.com/photos/2647053/pexels-photo-2647053.jpeg?auto=compress&cs=tinysrgb&w=1600")
alexa = User.create(name: "Alexa A", username: "alexa@email.com", password: "alexapassword", picture: "https://images.pexels.com/photos/2213575/pexels-photo-2213575.jpeg?auto=compress&cs=tinysrgb&w=1600")




#Creating destination
austin = Destination.create(name: "Austin")
oslo = Destination.create(name: "Oslo")
malaga = Destination.create(name: "Malaga")
tampa = Destination.create(name: "Tampa")
santaBarbara = Destination.create(name: "Santa Barbara")
fredrikstad = Destination.create(name: "Fredrikstad")
drippingSprings = Destination.create(name: "Dripping Springs")
zadar = Destination.create(name: "Zadar")
rome = Destination.create(name: "Rome")
copenhagen = Destination.create(name: "Copenhagen")
newYork = Destination.create(name: "New York")
stLouis = Destination.create(name: "St. Louis")
plitvice = Destination.create(name: "Plitvice")
bahrain = Destination.create(name: "Barhain")





#Creating postcards
p1 = Postcard.create(user_id: bob.id, destination_id: oslo.id, greeting: "Hi friend, Greetings from Oslo. What a great place! It is so nice and clean, and the people are very welcoming and friendly. It is cold, but we are having a great time. Wish you were here! Best, Bob & fam", image_url: "https://bit.ly/3CUOfEH")
p2 = Postcard.create(user_id: erik.id, destination_id: malaga.id, greeting:"Hola! We are having a blast in Malaga. The food is fantastico and the weather even better. Practicing some Spanish at the local markets. Going to Gibraltar tomorrow. Hope you are well! Saludos, Erik", image_url: "https://bit.ly/3TbYHxa")
p3 = Postcard.create(user_id: maria.id, destination_id: tampa.id, greeting: "Hey, Just wanted to send you a quick note from Tampa, FL! Beaches are beautiful, the seafood is delicious, and the theme parks are just an hour away. Having a blast! Going to the Zoo today. Take care! Maria xox ", image_url: "https://bit.ly/3Volh7q")
p4 = Postcard.create(user_id: erik.id, destination_id: santaBarbara.id, greeting: "Hello! This time I'm in the American Riviera, enjoying the beautiful Santa Barbara. Have done a great wine tour and explored the coast by boat. Love it here! Erik", image_url: "https://bit.ly/3yCR0I6")
p5 = Postcard.create(user_id: maria.id, destination_id: austin.id, greeting: "Hi y'all! Sending love from the capitol of Texas. The BBQ, nature, music and people are all great! From wine tasting in the Hill Country to SUP on the river, so much to do here! XOX Maria", image_url: "http://bit.ly/3hwV5rZ")
p6 = Postcard.create(user_id: liam.id, destination_id: fredrikstad.id, greeting: "Hællæ fra Plankebyen Fredrikstad! This is such a beautiful and historic town. Almost as pretty as Sarpsborg, where we were yesterday. Enjoying great seafod by the seaside here in Norway. Skål! From Liam", image_url: "https://live.staticflickr.com/8324/29787386915_57e124d137_b.jpg")
p7 = Postcard.create(user_id: sonder.id, destination_id: drippingSprings.id, greeting: "Hi y'all!! Greetings from the Texas Hill Country. We are having a blast. We have been on a tour of 5 of the 260 wineries in the area. And of course enjoying that fantastic TX BBQ! Wish y'all were here! Sonder", image_url: "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Hamilton-Pool-Photo_2b988812-eccb-af5d-0014fd31364b00ef.jpg")
p8 = Postcard.create(user_id: bill.id, destination_id: zadar.id, greeting: "Zdravo from Croatia! We are having such a great time here in Zadar. Hiking in Plitzvice national park and swimming in the crystal clear Adriatic Sea. Wish you were here! From Bill", image_url: "https://qtxasset.com/cdn-cgi/image/w=850,h=478,f=auto,fit=crop,g=0.5x0.5/https://qtxasset.com/quartz/qcloud1/media/image/2017-06/ZadarxbrchxiStockGettyImagesPlusGettyImages.jpg?VersionId=qN51W6t1cdmThyb5MySNECaLz7hkc7gU")
p9 = Postcard.create(user_id: alexa.id, destination_id: rome.id, greeting: "Bongiorno from Roma! This is our first visit to this amazing, historical city. We have seen the Colusseum and the Pantheom today. Going to the Vatican tomorrow. Maybe we'll see the Pope!! Ciao from Alexa A", image_url: "https://archaeology-travel.com/wp-content/uploads/2021/01/colosseum-sunrise.jpg")
p10 = Postcard.create(user_id: bob.id, destination_id: copenhagen.id, greeting: "Hi everyone! We are sending love from Copenhagen, Denmark. Its such a lovely city by the water. We have done lots of walking and exploring. Had great fun at the Tivoli park today. Hope you are well! Alexa & co", image_url: "https://imageio.forbes.com/specials-images/dam/imageserve/1128749011/960x0.jpg?format=jpg&width=960" )
p11 = Postcard.create(user_id: liam.id, destination_id: newYork.id, greeting: "Hi! I'm in New York for work this week, but found some time to do some sightseeing. What a fantastic city! Super busy for sure, but so much to see and do. I'll have to come back on a vacation one time! Alexa", image_url: "https://cdn.vox-cdn.com/thumbor/qkj77ift2lGUEhgLmtf_VVuND1c=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16387869/shutterstock_240592135.jpg")
p12 = Postcard.create(user_id: bill.id, destination_id: stLouis.id, greeting: "St. Lois is the place to be! Did you know this is where the hot dog, the hamburger, and the ice ream cone were invented during the World Fair in 1904?! Going up the Arc to see the sunset tonight. Take care! Billy", image_url: "https://gray-kmov-prod.cdn.arcpublishing.com/resizer/ySpgAVqJrkxw4iE6KpvXzkaeBlY=/1200x675/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/X3OGR6QEDBEITKRWAE2RBTGY5E.jpg")
p13 = Postcard.create(user_id: maria.id, destination_id: plitvice.id, greeting: "Dear friends, I am having the best time in Croatia! Today we have been hiking in Plitvice, a national park that is on the UNESCO World Heritage List. I can see why! Amazing waterfalls and greenery. I'll show pictures when I get home. Love, Maria", image_url: "https://i.pinimg.com/originals/2c/3a/87/2c3a873c00ce3f01eebd17fcf3ffd935.jpg")
p14 = Postcard.create(user_id: erik.id, destination_id: bahrain.id, greeting: "Hey! Sending a quick note from the Middle East. This is such a fascinating place. History and modern archietecture galore. Catching a race on the Formula 1 Grand Prix track tomorrow. Hope you are well! -Erik" , image_url: "https://www.nationsonline.org/gallery/Bahrain/Manama-WTC-and-Skyline.jpg" )

#Creating comments
c1 = Comment.create(postcard_id: p1.id, user_id: erik.id, content: "This looks like a great trip! Thanks for the postcard!")
c2 = Comment.create(postcard_id: p2.id, user_id: maria.id, content: "Thanks for sharing! I would love to go there one day! It sounds like so much fun")
c3 = Comment.create(postcard_id: p1.id, user_id: maria.id, content: "Cool! Did you get to see the park with all the statues?")
c4 = Comment.create(postcard_id: p3.id, user_id: bob.id, content: "Tampa is on my list! Was it very warm? I want to go next spring.")
c5 = Comment.create(postcard_id: p4.id, user_id: maria.id, content: "I love Santa Barbara! Make sure you get on a boat ride to see all the dolphins and sea lions. Downtown has lots of great restaurants to try. Also, I recommend a day trip to the wine country. Have fun! ")
c6 = Comment.create(postcard_id: p2.id, user_id: bob.id, content: "Hola amigo! Way to practice your Spanish! Can't wait to hear all about it when you come home. Salut!")
c7 = Comment.create(postcard_id: p5.id, user_id: erik.id, content: "Howdy Partner!")
c7 = Comment.create(postcard_id: p5.id, user_id: alexa.id, content: "Cool, I'm going there for a convention next week!")
c8 = Comment.create(postcard_id: p6.id, user_id: bill.id, content: "Have fun buddy!")
c9 = Comment.create(postcard_id: p7.id, user_id: bob.id, content: "Did you see any longhorns yet?")
c10 = Comment.create(postcard_id: p8.id, user_id: sonder.id, content: "Looks like a great trip")
c11 = Comment.create(postcard_id: p9.id, user_id: alexa.id, content: "Say hi to the Pope for me ;)")
c12 = Comment.create(postcard_id: p10.id, user_id: maria.id, content: "You have to try the red hotdogs there. And they do great breakfast too!")

puts "🌱Done Seeding 🌱"