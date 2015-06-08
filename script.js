(function(window, document, undefined) {
  
  $(document).ready(function () {
    $('#top-bar').fadeIn("fast").removeClass('hide');
    $('#instructions').fadeIn("slow").removeClass('hide');
  });

  var submit = document.querySelectorAll('[type="submit"]');

  function addListeners() {
    var markovButton = document.getElementById("markovButton"); 
    var chebyButton = document.getElementById("chebyButton"); 
    markovButton.addEventListener("click", function(event) { 
      event.preventDefault
      markovClear(); 
    });
    chebyButton.addEventListener("click", function(event) { 
      event.preventDefault
      chebyClear(); 
       
    });
  }

  function chebyClear() {
    var $markovButton = $(document.body).find("#markovContainer");
    var $chebyButton = $(document.body).find("#chebytext");
    $markovButton.remove(); 
    $chebyButton.remove(); 
    var $chebyDiv = $(document.body).find("#chebyshev_option");
    $chebyDiv.css({"margin-top":"50px"});
    continueCheby(); 
  }

  function markovClear() {
    var $markovButton = $(document.body).find(".markov_text");
    var $chebyButton = $(document.body).find("#chebyshevContainer");
    $markovButton.remove(); 
    $chebyButton.remove();      
    continueMarkov(); 
  }

  function continueMarkov() {
    var markovDiv = document.getElementById("markov_continue");
    markovDiv.innerHTML = ""; 
    var htmlString = "<input style=\"margin-top:30px;\" type=\"text\" name=\"search\" id=\"average\" placeholder=\"enter average (μ)\" />";
    htmlString += "<input type=\"submit\" value=\"submit average\" class=\"submit_values\" />"
    $(function(){  // $(document).ready shorthand
      markovDiv.innerHTML = htmlString;
      $('#markov_continue').hide().fadeIn("slow");
    });
    markovDiv.innerHTML = htmlString;
    var markovResponse = document.getElementsByClassName("submit_values"); 
    markovResponse[0].addEventListener("click", function(event) {
      average = document.getElementById("average"); 
      finishMarkov(Number(average.value)); 
    }); 
  }

  function finishMarkov(average) {
    var markovDiv = document.getElementById("markov_continue");
    var htmlString =  "<p style=\"font-size:25px;\" class=\"markov_input\"> Enter <span style=\"color:#f39c12;\"> a</span> such that P(X ≥ <span style=\"color:#f39c12;\">a</span>) </p>"
    htmlString += "<input style=\"margin-top:10px;\" type=\"text\" name=\"search\" id=\"average\" placeholder=\"P(X ≥ a)\" />";
    htmlString += "<input type=\"submit\" value=\"submit markov\" class=\"submit_values\" />"
    $(function(){  // $(document).ready shorthand
      markovDiv.innerHTML = htmlString;
      $('#markov_continue').hide().fadeIn("slow");
    });
    var markovResponse = document.getElementsByClassName("submit_values"); 
    markovResponse[0].addEventListener("click", function(event) {
      var probability = document.getElementById("average"); 
      probability = Number(probability.value); 
      var result = average/probability; 
      var HTMLstring = ""; 
      HTMLstring += "<p id=\"result\"> P(X ≥ <span style=\"color:#f39c12;\">" + probability + "</span>) given μ = <span style=\"color:#f39c12;\">" + average + "</span></p>"; 
      HTMLstring += "<p id=\"result\"> Estimate : <span style=\"color:#f39c12;\">" + result.toFixed(5) + "</span></p>"; 
      HTMLstring += "<p id=\"result\"> Percentage : <span style=\"color:#f1c40f;\">" + result.toFixed(5)*100 + "%</span></p>";
      $(function(){  // $(document).ready shorthand
        markovDiv.innerHTML = HTMLstring;
        $('#markov_continue').hide().fadeIn("slow");
      }); 
      submit[0].style.color = "#f39c12"; 
    }); 
  }

  function continueCheby() {
    var chebyDiv = document.getElementById("chebyshev_continue");
    chebyDiv.innerHTML = ""; 
    var htmlString = "<input style=\"margin-top:20px;\" type=\"text\" name=\"search\" id=\"average\" placeholder=\"enter average (μ)\" />";
    htmlString += "<input type=\"submit\" value=\"submit average\" class=\"submit_values\" />"
    $(function(){  // $(document).ready shorthand
      chebyDiv.innerHTML = htmlString;
      $('#chebyshevContainer').hide().fadeIn("slow");
    });
    var chebyResponse = document.getElementsByClassName("submit_values"); 
    chebyResponse[0].addEventListener("click", function(event) {
      var average = document.getElementById("average"); 
      processCheby(Number(average.value)); 
    }); 
  }

  function processCheby(average) {
    var chebyDiv = document.getElementById("chebyshev_continue");
    chebyDiv.innerHTML = ""; 
    var htmlString = "<input style=\"margin-top:20px;\" type=\"text\" name=\"search\" id=\"average\" placeholder=\"enter std dev. (σ&#0178)\" />";
    htmlString += "<input type=\"submit\" value=\"submit deviation\" class=\"submit_cheby\" />"
    $(function(){  // $(document).ready shorthand
      chebyDiv.innerHTML = htmlString;
      $('#chebyshev_continue').hide().fadeIn("slow");
    });
    var chebyResponse = document.getElementsByClassName("submit_cheby"); 
    chebyResponse[0].addEventListener("click", function(event) {
      var stddev = document.getElementById("average"); 
      stddev = Number(stddev.value); 
      finishCheby(average, stddev); 
    }); 
  }

  function finishCheby(average, stddev) {
    var chebyDiv = document.getElementById("chebyshev_continue");
    var htmlString =  "<p style=\"font-size:25px;\" class=\"markov_input\"> Enter <span style=\"color:#f39c12;\"> k</span> such that |X - <span style=\"color:#f1c40f;\">" + average + "</span>| ≥ <span style=\"color:#f39c12;\"> k</span></p>"
    htmlString += "<p style=\"font-size:14px;\"> distance from the mean </p>";
    htmlString += "<input type=\"text\" name=\"search\" id=\"average\" placeholder=\"|X - μ| ≥ k\" />";
    htmlString += "<input type=\"submit\" value=\"submit chebyshev\" class=\"submit_cheby\" />"
    $(function(){  // $(document).ready shorthand
      chebyDiv.innerHTML = htmlString;
      $('#chebyshev_continue').hide().fadeIn("slow");
    });
    var chebyResponse = document.getElementsByClassName("submit_cheby"); 
    chebyResponse[0].addEventListener("click", function(event) {
      var vary = document.getElementById("average"); 
      chebyDiv.innerHTML = ""; 
      vary = Number(vary.value); 
      var result = stddev/(vary*vary); 
      htmlString = ""; 
      htmlString += "<p id=\"result\"> P(|X - <span style=\"color:#f1c40f;\">" + average + "</span>| ≥ <span style=\"color:#f1c40f;\">" + vary + "</span>)</p>";
      htmlString += "<p id=\"result\"> Estimate : <span style=\"color:#f39c12;\">" + result + "</span></p>"; 
      htmlString += "<p id=\"result\"> Percentage : <span style=\"color:#f1c40f;\">" + result*100 + "%</span></p>"; 
      $(function(){  // $(document).ready shorthand
        chebyDiv.innerHTML = htmlString;
        $('#chebyshev_continue').hide().fadeIn("slow");
      });
      submit[0].style.color = "#f39c12"; 
    }); 
  }

  function processDropdown() {
    submit[0].addEventListener("click", function(event) { 
      event.preventDefault(); 
      location.reload(); 
    });
  }
  $(function(){
    $('html, body').animate({
        scrollTop: $("#instructions").offset().top
    }, 500);
    return false;
});
  addListeners();
  processDropdown();  


})(window, document);
