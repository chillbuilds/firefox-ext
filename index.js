let attackClicks = 0

let offIconSrc = 'https://imgur.com/bCZsoRe.png'
let onIconSrc = 'https://imgur.com/CqJSrmX.png'
let battledomeToggleSrc = offIconSrc

let battledomeHelper = localStorage.getItem('battledome-helper')
if(!battledomeHelper){
    localStorage.setItem('battledome-helper', false)
}

if(localStorage.getItem('battledome-helper') == 'true'){
    battledomeToggleSrc = onIconSrc
}

let abilitySelect = (ability) => {
    $('#p1am').click()
    let abilityArr = $('.ability').parent()
    for (var i = 0; i < abilityArr.length; i++) {
        if ($(abilityArr[i]).attr('title') == ability) {
            $(abilityArr[i].children[0]).click()
        }
    }
    return $('#p1am').hasClass('selected')
}

$(document).ready(function() {
    
    let parentDiv = $('#arenacontainer')
    let helperDiv = $('<div>').attr('style', `
        width: 15%;
        padding: 10px; 
        border: 1px solid black; 
        background: #FFD123; 
        position: fixed; 
        left: 0px; 
        top: 120px; 
        z-index: 10000;
        text-align: left;
        font-family: MuseoSansRounded500, Arial, sans-serif;
        user-select: none;
        `)
    helperDiv.attr('id', 'neopetsHelper')
    let bdSwitchVal = 'off'
    if(localStorage.getItem('battledome-helper') == 'true'){
        bdSwitchVal = 'on'
    }
    let switchDiv = $('<div>').html(`
        <div>
          links:
            <div style="padding:3px;">
                <div style="padding:3px;  cursor:pointer;" onClick="toggleSSW()">shop wizard</div>
                <div style="padding:3px; cursor:pointer;"><a href="https://www.neopets.com/dome/barracks.phtml">barracks</a></div>
                <div style="padding:3px;  cursor:pointer;"><a href="https://www.neopets.com/hospital/volunteer.phtml">hospital</a></div>
                <div style="padding:3px;  cursor:pointer;" onClick="openDailiesTabs()">dailies</div>
            </div>
        </div>
        <div id="battledomeHelperSwitch" value="${bdSwitchVal}">
        <div style="position:relative; float:left;">battledome helper</div><div><img id="battledomeToggle" style="width:28px; position:relative; float:right; cursor:pointer;" src="${battledomeToggleSrc}"></div>
        </div>
        <script>
            let toggleSSW = () => {
                if(typeof toggleSSW__2020 != 'undefined'){
                    toggleSSW__2020()
                }
                // if(toggleSSW__2020() != undefined){
                //     toggleSSW__2020()
                // }
                $('.sswdrop').removeClass('panel_hidden')
                $('.sswdrop').addClass('panel_shown')
                $('.sswdrop').attr('style', 'bottom:20px;')
                $('#ssw-criteria').val('exact')
                $('#searchstr').focus()
            }
            let openDailiesTabs = () => {
                window.open('https://www.neopets.com/bank.phtml', '_blank')
                window.open('https://www.neopets.com/desert/shrine.phtml', '_blank')
                window.open('https://www.neopets.com/pirates/forgottenshore.phtml', '_blank')
                window.open('https://www.neopets.com/desert/fruit/index.phtml', '_blank')
                window.open('https://www.neopets.com/jelly/jelly.phtml', '_blank')
                window.open('https://www.neopets.com/prehistoric/omelette.phtml', '_blank')
                window.open('https://www.neopets.com/shenkuu/neggcave/', '_blank')
                window.open('https://www.neopets.com/faerieland/tdmbgpop.phtml', '_blank')
                window.open('https://www.neopets.com/island/tombola.phtml', '_blank')    
            }
        </script>
        `)
    helperDiv.append(switchDiv)
    // let linksDiv = $('<div>').html(`
    //     <div style="position:absolute; margin-top:28px;">
    //         links:
    //     </div>
    //     `)
    // helperDiv.append(linksDiv)
    $('body').prepend(helperDiv)

    $('#arenacontainer').attr('style', 'margin-top: 60px;')
    parentDiv.prepend(helperDiv)

    $('#battledomeToggle').on('click', function() {
        if($('#battledomeHelperSwitch').attr('value') == 'on'){
            console.log('switch off')
            localStorage.setItem('battledome-helper', false)
            $('#battledomeToggle').attr('src', offIconSrc)
            $('#battledomeHelperSwitch').attr('value', 'off')
        }else{
            console.log('switch on')
            localStorage.setItem('battledome-helper', true)
            $('#battledomeToggle').attr('src', onIconSrc)
            $('#battledomeHelperSwitch').attr('value', 'on')
        }
    })

    let attackCheck = setInterval(function() {

        if($('#statusmsg').text() == 'Plan your next move...'){
            if(localStorage.getItem('battledome-helper') == 'true'){
                let itemSelect = (slotNum, item) => {
                    $(`#p1e${slotNum}m`).click()
                    let itemArr = $('.fsmid li')
                    for(var i = 0; i < itemArr.length; i++) {
                        if($(itemArr[i].children[0]).attr('title') == item){
                            $(itemArr[i].children[0]).click()
                            $(`#p1e${slotNum}m`).addClass('selected')
                            return $(`#p1e${slotNum}m`).hasClass('selected')
                        }
                    }
                }
                $('#skipreplay').click()
                itemSelect(1, 'Varia is the Bomb')
                itemSelect(2, 'Thunder Sticks')
                abilitySelect('Lens Flare')
                clearInterval(attackCheck)
            }
        }
    }, 100)
})