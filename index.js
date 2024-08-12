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

let itemSelect = (slotNum, item) => {
    $(`#p1e${slotNum}m`).click()
    let itemArr = $('.fsmid li')
    for(var i = 0; i < itemArr.length; i++) {
        if($(itemArr[i].children[0]).attr('title') == item){
            $(itemArr[i].children[0]).click()
            return $(`#p1e${slotNum}m`).hasClass('selected')
        }
    }
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
    
    let switchDiv = $('<div>').attr('style', `
        
        `)
    let bdSwitchVal = 'off'
    console.log(localStorage.getItem('battledome-helper'))
    if(localStorage.getItem('battledome-helper') == 'true'){
        bdSwitchVal = 'on'
    }
    switchDiv.html(`
        <div id="battledomeHelperSwitch" value="${bdSwitchVal}">
        <div style="position:relative; float:left;">battledome helper</div><div><img id="battledomeToggle" style="width:28px; position:relative; float:right; cursor:pointer;" src="${battledomeToggleSrc}"></div>
        </div>
        `)
    helperDiv.append(switchDiv)
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

    $('#start').click()

    let attackCheck = setInterval(function() {
        if($('#statusmsg').text() == 'Plan your next move...'){
            if(localStorage.getItem('battledome-helper') == 'true'){
                console.log('get em')
                $('#skipreplay').click()
                itemSelect(1, 'Varia is the Bomb')
                itemSelect(2, 'Thunder Sticks')
                abilitySelect('Lens Flare')
                clearInterval(attackCheck)
            }
        }
    }, 100)
})

let attack = () => {
    
    $('#skipreplay').click()
    itemSelect(1, 'Varia is the Bomb')
    itemSelect(2, 'Thunder Sticks')
    abilitySelect('Lens Flare')
    setTimeout(() => {
        // $('#fight').click()
        setInterval(() => {
            // $('#skipreplay').click()
        }, 1000)
    }, 500)
}
