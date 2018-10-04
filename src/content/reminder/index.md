---
layout: main.html
title: Wisdom
tagline: "\"The fear of the LORD is the beginning of wisdom\""
image: /images/desktop.jpg
---

I believe God has a plan in your life!

This tool returns a verse from Proverbs randomly by applying a function to this exact millisecond! 
I believe God can speak to you right now!

<p style="text-align: center">
  <button type="button" id="wisdom-btn"  class="wisdom-btn">Speak With Me</button>
</p>

<blockquote class="manifesto"></blockquote>

<span class="ref"></span>

<script type="application/javascript">
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function onClick(){
    $.getJSON('/json/proverbs.json', function(res){
      var chapter = getRandomInt(0, res.chapters.length-1);
      var verse = getRandomInt(0, res.chapters[chapter].length-1);
      $('.manifesto').html(res.chapters[chapter][verse]);
      $('.ref').html('Proverbs '+chapter+'.'+verse);
      $('.manifesto').addClass('fadeIn');
      
    });
  }
  
  $('#wisdom-btn').click(onClick);
  
</script>