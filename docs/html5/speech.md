# speech

> todo

网页中文本朗读功能开发实现 <https://mp.weixin.qq.com/s/TJLCoodizL-SAGDwVNOcqA>

SpeechSynthesisUtterance 用于语音合成

lang : 语言 Gets and sets the language of the utterance.
pitch : 音高 Gets and sets the pitch at which the utterance will be spoken at.
rate : 语速 Gets and sets the speed at which the utterance will be spoken at.
text : 文本 Gets and sets the text that will be synthesised when the utterance is spoken.
voice : 声音 Gets and sets the voice that will be used to speak the utterance.
volume : 音量 Gets and sets the volume that the utterance will be spoken at.
onboundary : 单词或句子边界触发，即分隔处触发 Fired when the spoken utterance reaches a word or sentence boundary.
onend : 结束时触发 Fired when the utterance has finished being spoken.
onerror : 错误时触发 Fired when an error occurs that prevents the utterance from being succesfully spoken.
onmark : Fired when the spoken utterance reaches a named SSML "mark" tag.
onpause : 暂停时触发 Fired when the utterance is paused part way through.
onresume : 重新播放时触发 Fired when a paused utterance is resumed.
onstart : 开始时触发 Fired when the utterance has begun to be spoken.
SpeechSynthesis 用于朗读

paused : Read only 是否暂停 A Boolean that returns true if the SpeechSynthesis object is in a paused state.
pending : Read only 是否处理中 A Boolean that returns true if the utterance queue contains as-yet-unspoken utterances.
speaking : Read only 是否朗读中 A Boolean that returns true if an utterance is currently in the process of being spoken — even if SpeechSynthesis is in a paused state.
onvoiceschanged : 声音变化时触发
cancel() : 情况待朗读队列 Removes all utterances from the utterance queue.
getVoices() : 获取浏览器支持的语音包列表 Returns a list of SpeechSynthesisVoice objects representing all the available voices on the current device.
pause() : 暂停 Puts the SpeechSynthesis object into a paused state.
resume() : 重新开始 Puts the SpeechSynthesis object into a non-paused state: resumes it if it was already paused.
speak() : 读合成的语音，参数必须为 SpeechSynthesisUtterance的实例 Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
详细api和说明可参考:

MDN - SpeechSynthesisUtterance
MDN - SpeechSynthesis
