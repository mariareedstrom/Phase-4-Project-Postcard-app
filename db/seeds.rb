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
p1 = Postcard.create(user_id: bob.id, destination_id: oslo.id, greeting: "Hi friend, Greetings from Oslo. What a great place! It is so nice and clean, and the people are very welcoming and friendly. It is cold, but we are having a great time. Wish you were here! Best, Bob & fam", image_url: "http:/oslimg.com")
p2 = Postcard.create(user_id: erik.id, destination_id: malaga.id, greeting:"Hola! We are having a blast in Malaga. The food is fantastico and the weather even better. Practicing some Spanish at the local markets. Going to Gibraltar tomorrow. Hope you are well! Saludos, Erik", image_url: "http:/malagapic.es")
p3 = Postcard.create(user_id: maria.id, destination_id: tampa.id, greeting: "Hey, Just wanted to send you a quick note from Tampa, FL! Beaches are beautiful, the seafood is delicious, and the theme parks are just an hour away. Having a blast! Going to the Zoo today. Take care! Maria xox ", image_url: "http:/tpafl.com")
p3 = Postcard.create(user_id: erik.id, destination_id: santaBarbara.id, greeting: "Hello! This time I'm in the American Riviera, enjoying the beautiful Santa Barbara. Have done a great wine tour and explored the coast by boat. Love it here! Erik", image_url: "http:/sbca.com")

puts "🌱 Done Seeding 🌱"