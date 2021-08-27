// if (window.location.pathname == "/") {
//   $ondelete = $(".table tbody td a.delete");
//   $ondelete.click(() => {
//     var id = $(this).attr("data-id");

//     var request = {
//       // url: `http://localhost:5000/api/urls/${id}`,
//       url: `https://my-tinyurl.herokuapp.com/api/urls/${id}`,
//       method: "DELETE",
//     };

//     if (confirm("Delete url record?")) {
//       $.ajax(request).done((response) => {
//         alert("Data Deleted Successfully!");
//         location.reload();
//       });
//     }
//   });
// }

const searchHandler = (element) => {
  value = $(element).val().toLowerCase();

  $("#urlTable tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().includes(value));
  });
};

const clearSearchHandler = () => {
  value = $("#search").val("");

  $("#urlTable tr").filter(function () {
    $(this).toggle(!$(this).text().toLowerCase().includes(value));
  });
};

const deleteHandler = (element) => {
  id = $(element).attr("data");

  var request = {
    // url: `http://localhost:5000/api/urls/${id}`,
    url: `https://my-tinyurl.herokuapp.com/api/urls/${id}`,
    method: "DELETE",
  };

  if (confirm("Delete url record?")) {
    $.ajax(request).done(function (response) {
      alert("Data Deleted Successfully!");
      location.reload();
    });
  }
};
