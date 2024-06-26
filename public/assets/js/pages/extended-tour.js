var tour = new Shepherd.Tour({
 defaultStepOptions: {
     cancelIcon: {
         enabled: !0
     },
     classes: "card",
     scrollTo: {
         behavior: "smooth",
         block: "center"
     }
 },
 useModalOverlay: {
     enabled: !0
 }
});
document.querySelector("#logo-tour") && tour.addStep({
 title: "Logo Here",
 text: "You can find here status of user who's currently online.",
 attachTo: {
     element: "#logo-tour",
     on: "bottom"
 },
 buttons: [{
     text: "Next",
     classes: "btn btn-success",
     action: tour.next
 }]
}),
document.querySelector("#tour-card-one") && tour.addStep({
 title: "Card One",
 text: "You can find here status of user who's currently online",
 attachTo: {
     element: "#tour-card-one",
     on: "bottom"
 },
 buttons: [{
     text: "Back",
     classes: "btn btn-light",
     action: tour.back
 }, {
     text: "Next",
     classes: "btn btn-success",
     action: tour.next
 }]
}),
document.querySelector("#tour-card-two") && tour.addStep({
 title: "Card Two",
 text: "You can find here status of user who's currently online",
 attachTo: {
     element: "#tour-card-two",
     on: "bottom"
 },
 buttons: [{
     text: "Back",
     classes: "btn btn-light",
     action: tour.back
 }, {
     text: "Next",
     classes: "btn btn-success",
     action: tour.next
 }]
}),
document.querySelector("#tour-card-three") && tour.addStep({
 title: "Card Three",
 text: "You can find here status of user who's currently online",
 attachTo: {
     element: "#tour-card-three",
     on: "bottom"
 },
 buttons: [{
     text: "Back",
     classes: "btn btn-light",
     action: tour.back
 }, {
     text: "Next",
     classes: "btn btn-success",
     action: tour.next
 }]
}),
document.querySelector("#tour-card-four") && tour.addStep({
 title: "Card Four",
 text: "You can find here status of user who's currently online",
 attachTo: {
     element: "#tour-card-four",
     on: "bottom"
 },
 buttons: [{
     text: "Back",
     classes: "btn btn-light",
     action: tour.back
 }, {
     text: "Next",
     classes: "btn btn-success",
     action: tour.next
 }]
}),
document.querySelector("#thankyou-tour") && tour.addStep({
 title: "Thank you !",
 text: "Here you can change theme skins and other features.",
 attachTo: {
     element: "#thankyou-tour",
     on: "bottom"
 },
 buttons: [{
     text: "Back",
     classes: "btn btn-light",
     action: tour.back
 }, {
     text: "Thank you !",
     classes: "btn btn-primary",
     action: tour.complete
 }]
}),
tour.start();
