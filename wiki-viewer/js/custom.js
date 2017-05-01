$(document).ready(function() {
    
    $("#search").click(function() {
        //alert($("#searchTerm").val());

        var response = {
  "batchcomplete": "",
  "continue": {
    "gsroffset": 10,
    "continue": "gsroffset||"
  },
  "query": {
    "pages": {
      "30863": {
        "pageid": 30863,
        "ns": 0,
        "title": "Test cricket",
        "index": 5,
        "thumbnail": {
          "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/England_vs_South_Africa.jpg/50px-England_vs_South_Africa.jpg",
          "width": 50,
          "height": 33
        },
        "pageimage": "England_vs_South_Africa.jpg",
        "extract": "Test cricket is the longest form of the sport of cricket and is considered its highest standard."
      },
      "54995": {
        "pageid": 54995,
        "ns": 0,
        "title": "Mantoux test",
        "index": 6,
        "thumbnail": {
          "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Mantoux_tuberculin_skin_test.jpg/50px-Mantoux_tuberculin_skin_test.jpg",
          "width": 50,
          "height": 33
        },
        "pageimage": "Mantoux_tuberculin_skin_test.jpg",
        "extract": "The Mantoux test or Mendel-Mantoux test (also known as the Mantoux screening test, tuberculin sensitivity test, Pirquet test, or PPD test for purified protein derivative) is a tool for screening for tuberculosis (TB) and for tuberculosis diagnosis."
      },
      "188261": {
        "pageid": 188261,
        "ns": 0,
        "title": "Test card",
        "index": 10,
        "thumbnail": {
          "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/50px-SMPTE_Color_Bars.svg.png",
          "width": 50,
          "height": 38
        },
        "pageimage": "SMPTE_Color_Bars.svg",
        "extract": "A test card, also known as a test pattern or start-up/closedown test is a television test signal, typically broadcast at times when the transmitter is active but no program is being broadcast (often at startup and closedown)."
      },
      "276250": {
        "pageid": 276250,
        "ns": 0,
        "title": "Rorschach test",
        "index": 8,
        "thumbnail": {
          "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rorschach_blot_01.jpg/50px-Rorschach_blot_01.jpg",
          "width": 50,
          "height": 33
        },
        "pageimage": "Rorschach_blot_01.jpg",
        "extract": "The Rorschach test is a psychological test in which subjects' perceptions of inkblots are recorded and then analyzed using psychological interpretation, complex algorithms, or both."
      },
      "536080": {
        "pageid": 536080,
        "ns": 0,
        "title": "Student's t-test",
        "index": 7,
        "extract": "A t-test is any statistical hypothesis test in which the test statistic follows a Student's t-distribution under the null hypothesis."
      },
      "1086547": {
        "pageid": 1086547,
        "ns": 0,
        "title": "Test automation",
        "index": 4,
        "extract": "In software testing, test automation is the use of special software (separate from the software being tested) to control the execution of tests and the comparison of actual outcomes with predicted outcomes."
      },
      "1461217": {
        "pageid": 1461217,
        "ns": 0,
        "title": "Coombs test",
        "index": 9,
        "extract": "A Coombs test (also known as Coombs' test, antiglobulin test or AGT) is either of two clinical blood tests used in immunohematology and immunology."
      },
      "11089416": {
        "pageid": 11089416,
        "ns": 0,
        "title": "Test",
        "index": 1,
        "extract": "Test, TEST or Tester may refer to:"
      },
      "24884283": {
        "pageid": 24884283,
        "ns": 0,
        "title": "TeST Gliders",
        "index": 2,
        "thumbnail": {
          "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/104_b_aircraft_0.jpg/50px-104_b_aircraft_0.jpg",
          "width": 50,
          "height": 38
        },
        "pageimage": "104_b_aircraft_0.jpg",
        "extract": "TeST Gliders is a manufacturer of ultralight sailplanes and motorgliders based in Brno, Czech Republic."
      },
      "33660916": {
        "pageid": 33660916,
        "ns": 0,
        "title": "Test (assessment)",
        "index": 3,
        "thumbnail": {
          "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Exams_in_Jaura%2C_India.jpg/50px-Exams_in_Jaura%2C_India.jpg",
          "width": 50,
          "height": 33
        },
        "pageimage": "Exams_in_Jaura,_India.jpg",
        "extract": "A test or examination (informally, exam or evaluation) is an assessment intended to measure a test-taker's knowledge, skill, aptitude, physical fitness, or classification in many other topics (e.g., beliefs)."
      }
    }
  },
  "limits": {
    "pageimages": 50,
    "extracts": 20
  }
};

        var html = "";

        

        var pages = response.query.pages;
        for (var page in pages) {
            if (pages.hasOwnProperty(page)) {
                console.log(page + " -> " + pages[page].title + ", " + pages[page].extract + ", " + pages[page].pageid);
                html += "<div class='panel panel-primary'>";
                html += "<div class='panel-heading'>";
                html += "<h3 class='panel-title'>" + pages[page].title + "</h3>";
                html += "</div>"
                html += "<div class='panel-body'>";
                html += "<span class='description'>" + pages[page].extract + "</span>"; 
                html += "<a class='btn btn-info btn-sm' href='https://en.wikipedia.org/?curid=" + pages[page].pageid + "' target='_blank'>View Wiki</a>";
                html += "</div>";
                html += "</div>";
            }
        }

        $(".results").html(html);

        /*
        $.get("http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=test&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max", function(response) {

            alert("calling is working");

        }, "jsonp");*/
    });
});