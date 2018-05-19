/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Watched transaction processor function.
 * @param {org.acme.sample.RecievedTransaction} tx The watched transaction instance.
 * @transaction
 */
function watchMsg(tx) {
  	tx.msg.producer.points = tx.msg.producer.points + 10;
    tx.consumer.reputation = tx.consumer.reputation + 100;
  
  	if(tx.msg.published == false){
      // Emit an event for the modified asset.
      var event = getFactory().newEvent('org.acme.sample', 'ErrorEvent');
      event.eventName = tx.msg.clipId+" cannot be viewed, it is not published yet."
      emit(event);
      return null
    }else{
      // Get the asset registry for the asset.
      return getAssetRegistry('org.acme.sample.E2EMsg')
          .then(function (assetRegistry) {

              // Update the asset in the asset registry.
              return assetRegistry.update(tx.msg);

          })
          .then(function () {
              return getParticipantRegistry('org.acme.sample.User');
          })
          .then(function (participantRegistry) {

              // Update the asset in the asset registry.
              return participantRegistry.update(tx.msg.producer);
          })
          .then(function () {
              return getParticipantRegistry('org.acme.sample.User');
          })
          .then(function (participantRegistry) {

              // Update the asset in the asset registry.
              return participantRegistry.update(tx.consumer);
          })
          .then(function () {

              // Emit an event for the modified asset.
              var event = getFactory().newEvent('org.acme.sample', 'WatchedEvent');
              event.eventName = tx.consumer.firstName+" watched clip: "+tx.msg.clipId
              event.msg = tx.msg;
              event.producer = tx.msg.producer;
              event.consumer = tx.consumer;
              emit(event);
          });
    }
}

/**
 * Published transaction processor function.
 * @param {org.acme.sample.PublishedTransaction} tx The published transaction instance.
 * @transaction
 */
function publishVideoClip(tx) {
  	tx.msg.producer.reputation = tx.msg.producer.reputation + 100;
    tx.msg.published = true;
  
  	if(tx.msg.producer.userId != tx.producer.userId){
      // Emit an event for the modified asset.
      var event = getFactory().newEvent('org.acme.sample', 'ErrorEvent');
      event.eventName = tx.msg.clipId+" can only be published by the producer: "+tx.producer.userId
      emit(event);
      return null
    }else{
      // Get the asset registry for the asset.
      return getAssetRegistry('org.acme.sample.E2EMsg')
          .then(function (assetRegistry) {

              // Update the asset in the asset registry.
              return assetRegistry.update(tx.msg);

          })
          .then(function () {
              return getParticipantRegistry('org.acme.sample.User');
          })
          .then(function (participantRegistry) {

              // Update the asset in the asset registry.
              return participantRegistry.update(tx.msg.producer);
          })
          .then(function () {

              // Emit an event for the modified asset.
              var event = getFactory().newEvent('org.acme.sample', 'PublishedEvent');
              event.eventName = tx.producer.firstName+" published clip: "+tx.msg.clipId
              event.msg = tx.msg;
              event.producer = tx.msg.producer;
              emit(event);
          });
    }
}