# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
puts "🌱 Seeding your postcards..."
#clean-up before seeding
Postcard.destroy_all
Destination.destroy_all
User.destroy_all

#Creating users
bob = User.create(name: "Bob", username: "bob@gmail.com", password: "sosecure")
erik = User.create(name: "Erik", username: "erik@email.com", password: "sosecret")
maria = User.create(name: "Maria", username: "maria@dmail.com", password: "sosafe")


#Creating destination
austin = Destination.create(name: "Austin")
oslo = Destination.create(name: "Oslo")
malaga = Destination.create(name: "Malaga")
tampa = Destination.create(name: "Tampa")
santaBarbara = Destination.create(name: "Santa Barbara")

#Creating postcards
p1 = Postcard.create(user_id: bob.id, destination_id: oslo.id, greeting: "Hi friend, Greetings from Oslo. What a great place! It is so nice and clean, and the people are very welcoming and friendly. It is cold, but we are having a great time. Wish you were here! Best, Bob & fam", image_url: "https://bit.ly/3CUOfEH")
p2 = Postcard.create(user_id: erik.id, destination_id: malaga.id, greeting:"Hola! We are having a blast in Malaga. The food is fantastico and the weather even better. Practicing some Spanish at the local markets. Going to Gibraltar tomorrow. Hope you are well! Saludos, Erik", image_url: "https://bit.ly/3TbYHxa")
p3 = Postcard.create(user_id: maria.id, destination_id: tampa.id, greeting: "Hey, Just wanted to send you a quick note from Tampa, FL! Beaches are beautiful, the seafood is delicious, and the theme parks are just an hour away. Having a blast! Going to the Zoo today. Take care! Maria xox ", image_url: "https://bit.ly/3Volh7q")
p4 = Postcard.create(user_id: erik.id, destination_id: santaBarbara.id, greeting: "Hello! This time I'm in the American Riviera, enjoying the beautiful Santa Barbara. Have done a great wine tour and explored the coast by boat. Love it here! Erik", image_url: "https://bit.ly/3yCR0I6")


#Creating comments
c1 = Comment.create(postcard_id: p1.id, user_id: erik.id, content: "This looks like a great trip! Thanks for the postcard!")
c2 = Comment.create(postcard_id: p2, user_id: maria.id, content: "Thanks for sharing! I would love to go there one day! It sounds like so much fun")
c3 = Comment.create(postcard_id: p1.id, user_id: maria.id, content: "Cool! Did you get to see the park with all the statues?")
c4 = Comment.create(postcard_id: p3, user_id: bob.id, content: "Tampa is on my list! Was it very warm? I want to go next spring.")
c5 = Comment.create(postcard_id: p4, user_id: maria.id, content: "I love Santa Barbara! Make sure you get on a boat ride to see all the dolphins and sea lions. Downtown has lots of great restaurants to try. Also, I recommend a day trip to the wine country. Have fun! ")
c6 = Comment.create(postcard_id: p2, user_id: bob.id, content: "Hola amigo! Way to practice your Spanish! Can't wait to hear all about it when you come home. Salut!")

puts "🌱Done Seeding 🌱"