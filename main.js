
// Define the height and width of the svg as global variables
const width = 700;
const height = 600;

// Additionally we'll store the dimensions of this space too
let chart;
let chartWidth;
let chartHeight;

// Declare both scales too
let xScale;
let yScale;


let keyframes = [
    {
        activeVerse: 1,
        activeLines: [1, 2, 3, 4],
        svgUpdate:() => scatterPlot(generalData,200, "Median Women's Earning v/s Median Men's Earnings across different sectors", 180, true),
        
    },
    {
        activeVerse: 2,
        activeLines: [1],
        //svgUpdate: drawRoseColours
    },
    {
        activeVerse: 2,
        activeLines: [2],
        //svgUpdate: () => highlightColour("Red", "red")//Note the slightly weird syntax here as we want to pass values to the function so we have to use an anonymous function to do this otherwise svgUpdate will just be bound to the result of running that function with those arguments
    },
    {
        activeVerse: 2,
        activeLines: [3],
        //svgUpdate: () => highlightColour("White", "white")
        svgUpdate:() => scatterPlot(businessData,205, "Median Women's Earning v/s Median Men's Earnings in Business ", 250, false),
    },
    {
        activeVerse: 2,
        activeLines: [4],
        //svgUpdate: () => highlightColourAll()
        svgUpdate:() => scatterPlot(medicalData,250, "Median Women's Earning v/s Median Men's Earnings in Medical Care", 250, false),

    },
    {
        activeVerse: 3,
        activeLines: [1],
        //svgUpdate: drawRoseColours
        svgUpdate:() => scatterPlot(generalData,200, "Median Women's Earning v/s Median Men's Earnings across different sectors", 180, true),

    },
    {
        activeVerse: 3,
        activeLines: [2],
        //svgUpdate: () => highlightColour("Red", "red")//Note the slightly weird syntax here as we want to pass values to the function so we have to use an anonymous function to do this otherwise svgUpdate will just be bound to the result of running that function with those arguments
    },
    {
        activeVerse: 3,
        activeLines: [3],
        //svgUpdate: () => highlightColour("White", "white")
    },
    {
        activeVerse: 3,
        activeLines: [4],
        //svgUpdate: () => highlightColourAll()
    },
    {
        activeVerse: 4,
        activeLines: [1],
        //svgUpdate:() => drawRoseColours,

        //svgUpdate: () => highlightColour(" ", " ")
    

    },
    {
        activeVerse: 4,
        activeLines: [2],
        //svgUpdate:() => drawRoseColours,

    },
    {
        activeVerse: 4,
        activeLines: [3],
        //svgUpdate:() => drawRoseColours,
        //svgUpdate: () => reorderBars()
    },
    {
        activeVerse: 4,
        activeLines: [4],
        //svgUpdate:() => removePieChart(),
        //svgUpdate: drawRoseColours
    },
    {
        activeVerse: 5,
        activeLines: [1],
        //svgUpdate:() => pie(),
        
    },
    {
        activeVerse: 5,
        activeLines: [2],
    },
    {
        activeVerse: 5,
        activeLines: [3]
    },
    {
        activeVerse: 5,
        activeLines: [4]

    },
    {
        activeVerse: 6,
        activeLines: [1],
        //svgUpdate:() => pie(),
        
    },
    {
        activeVerse: 6,
        activeLines: [2],
    },
    {
        activeVerse: 6,
        activeLines: [3]
    },
    {
        activeVerse: 6,
        activeLines: [4]

    },
    {
        activeVerse: 7,
        activeLines: [1],
        //svgUpdate:() => pie(),
        
    },
    {
        activeVerse: 7,
        activeLines: [2],
    },
    {
        activeVerse: 7,
        activeLines: [3]
    },
    {
        activeVerse: 7,
        activeLines: [4]
    }

]
// TODO add svgUpdate fields to keyframes

// TODO define global variables
let svg = d3.select("#svg");
let keyframeIndex = 0;

// TODO add event listeners to the buttons

document.getElementById("forward-button").addEventListener("click", forwardClicked);
document.getElementById("backward-button").addEventListener("click", backwardClicked);


// TODO write an asynchronous loadData function
// Initialise two global variables to store the data when it is loaded
let roseChartData;
let violetChartData;

// You have to use the async keyword so that javascript knows that this function utilises promises and may not return immediately
async function loadData() {
    // Because d3.json() uses promises we have to use the keyword await to make sure each line completes before moving on to the next line

    await d3.json("business.json").then(data => {
        businessData = data;
    });

    await d3.json("medical.json").then(data => {
        medicalData = data;
    });

    await d3.json("general.json").then(data => {
        generalData = data;
    });
}

// Now that we are calling an asynchronous function in our initialise function this function also now becomes async
async function initialise() {
    // Don't forget to await the call to loadData()
    await loadData();
    initialiseSVG();
    drawKeyframe(keyframeIndex);
}

// TODO draw a bar chart from the rose dataset
function draw(){
    drawBarChart(roseChartData, "Distribution of Rose Colours");

}
function drawRoseColours() {
    updateBarChart(roseChartData, "Distribution of Rose Colours");
}

// TODO draw a bar chart from the violet dataset
function drawVioletColours() {
    updateBarChart(violetChartData, "Distribution of Violet Colours");
}

function pie(){
    PieChart(roseChartData,"Distribution of Rose Colours");
}

        

function highlightColourAll(colourName, highlightColour) {
    // TODO select bar that has the right value
    // TODO update it's fill colour

    //TODO add a transition to make it smooth
    svg.selectAll(".bar")
    .transition() // call transition immediately before the attribute that you are changing
        .duration(700) // decide how long you want that transition to last in milliseconds
       
        .attr("fill", d => (d.colour));
        


}


function scatterPlot(data, value, title, legendh, check){
   
// Define the height and width of the svg as global variables
svg.selectAll("*").remove();

// Define the margin so that there is space around the vis for axes and labels
const margin = { top: 30, right: 30, bottom: 50, left: 50 };
let chartWidth = width - margin.left - margin.right - 100;
let chartHeight = height - margin.top - margin.bottom;


let chart = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// Define your scales
const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Women)])
    .nice()
    .range([0, chartWidth]);


const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Men)])
    .nice()
    .range([chartHeight, 0]);




// Create an SVG element

    svg.append("text")
    .attr("id", "chart-title")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("fill", "darkblue")
    .text(title);

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.Women + value ))
    .attr("cy", d => yScale(d.Men - value ))
    .attr("r", d => 700/d.Percentage)
    .attr("fill", d => d.colour)
    .on("mouseover", function (event, d) {
       
        svg.append("text")
            .attr("class", "occupation-label")
            .attr("x", xScale(d.Women + value - 480))
            .attr("y", yScale(d.Men - value) - 10) 
            .text(d.Occupation);
    })
    .on("mouseout", function () {
        svg.selectAll(".occupation-label").remove();
    });

    chart.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text");

    chart.append("text")
    .attr("class", "x-axis-label")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + 40) 
    .style("text-anchor", "middle")
    .text("Median Women's Earnings");

    chart.append("text")
    .attr("class", "y-axis-label")
    .attr("x", -chartHeight / 2) 
    .attr("y", -37.5)
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .attr("transform", "rotate(-90)") 
    .text("Median Men's Earnings");



chart.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    .selectAll("text")


     if ( check){
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (chartWidth + 60) + "," + (chartHeight-legendh)  + ")");


    const legendItems = legend.selectAll(".legend-item")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => "translate(0," + (i * 20) + ")");

    legendItems.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", d => d.colour)
        

    legendItems.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .text(d => d.Occupation)
        .style("font-size", "15px");
     }

   




}



 



// TODO Update the xScale domain to match new order
// TODO Update the yScale domain for new values

// TODO select all the existing bars
// TODO remove any bars no longer in the dataset
// TODO move any bars that already existed to their correct spot
// TODO Add any new bars

// TODO update the x and y axis

// TODO update the title

// TODO add some animation to this

function forwardClicked() {
     // Make sure we don't let the keyframeIndex go out of range
  if (keyframeIndex < keyframes.length - 1) {
    keyframeIndex++;
    drawKeyframe(keyframeIndex);
  }
}

function backwardClicked() {
    if (keyframeIndex > 0) {
        keyframeIndex--;
        drawKeyframe(keyframeIndex);
      }
}



function drawKeyframe(kfi) {
    let kf = keyframes[kfi];
    resetActiveLines();
    updateActiveVerse(kf.activeVerse);

    for (line of kf.activeLines){
        updateActiveLine(kf.activeVerse,line);
    }


    // We need to check if their is an svg update function defined or not
    if(kf.svgUpdate){
        // If there is we call it like this
        kf.svgUpdate();
    }



   
   
        
   
   


    

}

    // TODO get keyframe at index position

    // TODO reset any active lines

    // TODO update the active verse

    // TODO update any active lines

    // TODO update the svg


function scrollLeftColumnToActiveVerse(id) {
    // First we want to select the div that is displaying our text content
    var leftColumn = document.querySelector(".left-column-content");

    // Now we select the actual verse we would like to be centred, this will be the <ul> element containing the verse
    var activeVerse = document.getElementById("verse" + id);

    // The getBoundingClientRect() is a built in function that will return an object indicating the exact position
    // Of the relevant element relative to the current viewport.
    // To see a full breakdown of this read the documentation here: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    var verseRect = activeVerse.getBoundingClientRect();
    var leftColumnRect = leftColumn.getBoundingClientRect();

    // Now we calculate the exact location we would like to scroll to in order to centre the relevant verse
    // Take a moment to rationalise that this calculation does what you expect it to
    var desiredScrollTop = verseRect.top + leftColumn.scrollTop - leftColumnRect.top - (leftColumnRect.height - verseRect.height) / 2;

    // Finally we scroll to the right location using another built in function.
    // The 'smooth' value means that this is animated rather than happening instantly
    leftColumn.scrollTo({
        top: desiredScrollTop,
        behavior: 'smooth'
    })
}






// TODO write a function to reset any active lines
function resetActiveLines() {
    d3.selectAll(".line").classed("active-line" , false);
    
}

// TODO write a function to update the active verse
function updateActiveVerse(id) {
    d3.selectAll(".verse").classed("active-verse", false);

    // Update the class list of the desired verse so that it now includes the class "active-verse"
    d3.select("#verse" + id).classed("active-verse", true);

    // Scroll the column so the chosen verse is centred
    scrollLeftColumnToActiveVerse(id);
    
}

// TODO write a function to update the active line
function updateActiveLine(vid, lid) {
    // Select the correct verse
  let thisVerse = d3.select("#verse" + vid);
  // Update the class list of the relevant lines
  thisVerse.select("#line" + lid).classed("active-line", true);
}




// TODO write a function to scroll the left column to the right place
// TODO write a function to scroll the left column to the right place
// TODO select the div displaying the left column content
// TODO select the verse we want to display
// TODO calculate the bounding rectangles of both of these elements
// TODO calculate the desired scroll position
// TODO scroll to the desired position
// TODO call this function when updating the active verse

// TODO write a function to initialise the svg properly



// Define the svg itself as a global variable


function initialiseSVG(){

    svg.attr("width", width);
    svg.attr("height", height);

    svg.selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale = d3.scaleBand()
        .domain([])
        .range([0, chartWidth])
        .padding(0.1);

    yScale = d3.scaleLinear()
        .domain([])
        .nice()
        .range([chartHeight, 0]);

    // Add x-axis
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text");

    // Add y-axis
    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .selectAll("text");

    // Add title
    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "white")
        .text("");
}






async function initialise() {
    // TODO draw the first keyframe
    await loadData();
    initialiseSVG();
 
    drawKeyframe(keyframeIndex);
   
}

initialise();