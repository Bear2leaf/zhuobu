import Main from './js/main'

wx.cloud.init()
// wx.cloud.downloadFile({
//     fileID: 'cloud://cloud1-4gkzszrnfdcc9814.636c-cloud1-4gkzszrnfdcc9814-1307362775/IDEPack/textures/block.png',
//     success(res: any) {
//         const img = wx.createImage()
//         img.src = res.tempFilePath;
//         img.onload = () => {
//             console.log(img.width)
//             wx.showToast({
//                 title: `${img.width}`
//             })
//         }
//     }
// })
new Main()